"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GlobalLoader from "@/components/GlobalLoader";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { PersonalInformation } from "@/components/profile/PersonalInformation";
import { ChangePassword } from "@/components/profile/ChangePassword";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { TicketHistory } from "@/components/profile/TicketHistory";
import { DropdownMenuItem, DropdownMenuLabel } from "@/components/ui/dropdown-menu";

export default function Profile() {
  const { user, logout, updateUser } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    router.push("/");
  };

  const handleUpdateUser = async (updatedData) => {
    await updateUser(updatedData);
  };

  if (!user) {
    return <div className="h-dvh flex items-center justify-center">
      <p>Hey there! Please log in to access your profile.</p>
    </div>;
  }

  return (
    <div className="flex flex-col overflow-hidden space-y-4 pb-4">
      {/* Profile Header */}
      <ProfileHeader user={user} onLogout={handleLogout} className="pb-4" />

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4 flex-1 overflow-hidden">
        {/* Left Column - Personal Info & Security */}
        <div className="lg:col-span-2 flex flex-col gap-2 md:gap-4 overflow-y-auto h-full">
          <PersonalInformation user={user} onUpdate={handleUpdateUser} className="flex-1" />
          <ChangePassword className="flex-shrink-0" />
        </div>

        {/* Right Column - Ticket History & Settings */}
        <div className="lg:col-span-1 flex flex-col overflow-hidden min-h-0">
          <TicketHistory className="flex-1 min-h-0" />
        </div>

      </div>
    </div>
  );
}


