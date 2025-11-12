"use client";

import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconCircleCheck,
  IconCircleX,
  IconMail,
  IconCamera,
  IconUpload,
  IconTrash,
  IconX,
  IconPhoto,
  IconLoader2,
  IconInfoCircle,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import api from "@/lib/api";
import { useUserStore } from "@/store/userStore";
import { AccountSettings } from "./AccountSettings";

export function ProfileHeader({ user, className, onLogout }) {
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { updateUser } = useUserStore();

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
      setIsAvatarDialogOpen(true);
    }
  };

  const handleAvatarUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("folder", "avatars");

    try {
      setIsUploading(true);

      // Upload file to server
      const uploadRes = await api.post("/util/upload", formData);
      if (uploadRes.status === 200) {
        const avatarURL = uploadRes.data.file.url;

        // Update user profile with new avatar
        const success = await updateUser({ avatar: avatarURL });

        if (success) {
          toast.success("Profile updated successfully!");
          setIsAvatarDialogOpen(false);
          setSelectedFile(null);
          setPreviewURL("");
        }
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    try {
      setIsUploading(true);
      const success = await updateUser({ avatar: "" });

      if (success) {
        toast.success("Avatar removed successfully!");
        setIsAvatarDialogOpen(false);
      }
    } catch (error) {
      toast.error("Failed to remove avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancelUpload = () => {
    setIsAvatarDialogOpen(false);
    setSelectedFile(null);
    setPreviewURL("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className={cn("w-full overflow-hidden p-0 py-2", className)}>
      <CardContent className="">
        <div className="flex flex-row gap-6 items-center sm:items-start">
          {/* Avatar Section with Enhanced Design */}
          <div className="relative group">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/20 rounded-[28px] blur-sm opacity-75 group-hover:opacity-100 transition duration-300"></div>
              
              {/* Avatar Container */}
              <div className="relative">
                <Avatar className="h-24 w-24 rounded-3xl border-4 border-background shadow-xl">
                  <AvatarImage 
                    src={user?.avatar} 
                    alt={user?.name} 
                    className="rounded-3xl object-cover"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-2xl font-bold rounded-3xl">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>

                {/* Enhanced Camera Overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-black/60 backdrop-blur-sm rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
                  aria-label="Change avatar"
                >
                  <IconCamera className="h-6 w-6 text-white" stroke={2} />
                  <span className="text-[10px] text-white font-medium">Change</span>
                </button>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  aria-label="Upload avatar"
                />

                {/* Enhanced Verification Badge */}
                <div className="absolute -bottom-1 -right-1 z-10">
                  {user?.isVerified ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-success shadow-lg ring-4 ring-background">
                      <IconCircleCheck className="h-4 w-4 text-background " stroke={2.5} />
                    </div>
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-destructive shadow-lg ring-4 ring-background">
                      <IconCircleX className="h-4 w-4 text-white" stroke={2.5} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced User Info Section */}
          <div className="flex-1 space-y-3 text-center sm:text-left min-w-0">
            {/* Name and Email */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {user?.name || "User Name"}
              </h1>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                <IconMail className="h-4 w-4 flex-shrink-0" stroke={1.5} />
                <span className="text-sm truncate">{user?.email || "email@example.com"}</span>
              </div>
            </div>

            {/* Enhanced Verification Badge */}
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <Badge
                variant={user?.isVerified ? "default" : "destructive"}
                className={cn(
                  "gap-1.5 text-xs font-medium px-3 py-1 shadow-sm",
                  user?.isVerified && "bg-success hover:bg-success"
                )}
              >
                {user?.isVerified ? (
                  <>
                    <IconCircleCheck className="h-3.5 w-3.5" stroke={2.5} />
                    Verified Account
                  </>
                ) : (
                  <>
                    <IconCircleX className="h-3.5 w-3.5" stroke={2.5} />
                    Unverified
                  </>
                )}
              </Badge>
            </div>
          </div>

          {/* Settings Button */}
          <div className="flex items-start">
            <AccountSettings user={user} onLogout={onLogout} />
          </div>
        </div>
      </CardContent>

      {/* Enhanced Avatar Upload Dialog */}
      <Dialog open={isAvatarDialogOpen} onOpenChange={handleCancelUpload}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <IconCamera className="h-5 w-5 text-primary" stroke={2} />
              </div>
              <span>Update Profile Picture</span>
            </DialogTitle>
            <DialogDescription className="text-base">
              Upload a new profile picture to personalize your account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Enhanced Preview Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group/preview">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-[32px] transform scale-105"></div>
                
                <div className="relative p-4">
                  <Avatar className="h-40 w-40 rounded-[32px] border-4 border-background shadow-2xl">
                    <AvatarImage 
                      src={previewURL || user?.avatar} 
                      alt="Preview" 
                      className="rounded-[28px] object-cover"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-4xl font-bold rounded-[28px]">
                      {getInitials(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {selectedFile && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[32px] opacity-0 group-hover/preview:opacity-100 transition-opacity">
                      <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs font-medium shadow-lg">
                        New Photo
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedFile && (
                <div className="text-center space-y-1 bg-muted/50 rounded-lg px-4 py-3 w-full">
                  <div className="flex items-center justify-center gap-2">
                    <IconPhoto className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground truncate max-w-xs">
                      {selectedFile.name}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / 1024).toFixed(2)} KB • {selectedFile.type.split('/')[1].toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            {/* File Upload Guidelines */}
            {!selectedFile && (
              <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
                <IconInfoCircle className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <p className="font-medium">Image Guidelines:</p>
                  <ul className="list-disc list-inside space-y-0.5 text-blue-600 dark:text-blue-400">
                    <li>Supported formats: JPG, PNG, GIF, WebP</li>
                    <li>Maximum file size: 5MB</li>
                    <li>Recommended: Square images (1:1 ratio)</li>
                  </ul>
                </div>
              </div>
            )}

            <Separator />

            {/* Action Buttons */}
            {!selectedFile && (
              <div className="grid gap-3">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full gap-2 shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <IconUpload className="h-5 w-5" stroke={2} />
                  Choose New Picture
                </Button>

                {user?.avatar && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
                    onClick={handleRemoveAvatar}
                    disabled={isUploading}
                  >
                    <IconTrash className="h-5 w-5" stroke={2} />
                    Remove Picture
                  </Button>
                )}
              </div>
            )}
          </div>

          {selectedFile && (
            <DialogFooter className="gap-2 sm:gap-2">
              <Button
                variant="outline"
                size="lg"
                onClick={handleCancelUpload}
                disabled={isUploading}
                className="flex-1 sm:flex-initial gap-2"
              >
                <IconX className="h-4 w-4" />
                Cancel
              </Button>
              <Button
                onClick={handleAvatarUpload}
                disabled={isUploading}
                size="lg"
                className="flex-1 sm:flex-initial gap-2 shadow-md"
              >
                {isUploading ? (
                  <>
                    <IconLoader2 className="h-4 w-4 animate-spin" stroke={2} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <IconUpload className="h-4 w-4" stroke={2} />
                    Upload Photo
                  </>
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}