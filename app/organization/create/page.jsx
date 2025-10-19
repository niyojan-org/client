'use client';

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { useUserStore } from "@/store/userStore";

export default function CreateOrganization() {
  const router = useRouter();
  const { isAuthenticated, loading: userLoading } = useUserStore();

  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    phone: "",
    alternativePhone: "",
    category: "",
    subCategory: "",
  });
  const [loading, setLoading] = useState(false);

  // --- Redirect if not authenticated ---
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      toast.error("Please log in to create an organization");
      router.replace("/auth?view=login");
    }
  }, [isAuthenticated, userLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setOrgData((prev) => ({ ...prev, category: value, subCategory: "" }));
  };

  const handleSubCategoryChange = (value) => {
    setOrgData((prev) => ({ ...prev, subCategory: value }));
  };

  const getSubCategories = (category) => {
    const subCategories = {
      college: [
        "Engineering College",
        "Medical College",
        "Arts & Science College",
        "Business School",
        "Community College",
        "University",
        "Other Educational Institute",
      ],
      corporate: [
        "Technology Company",
        "Financial Services",
        "Healthcare Organization",
        "Manufacturing Company",
        "Consulting Firm",
        "Retail Business",
        "Other Corporate",
      ],
      nonprofit: [
        "Charity Organization",
        "Religious Organization",
        "Community Service",
        "Environmental Group",
        "Educational Foundation",
        "Health & Wellness",
        "Other Non-Profit",
      ],
      startup: [
        "Tech Startup",
        "FinTech Startup",
        "Health Tech",
        "E-commerce",
        "SaaS Company",
        "Mobile App",
        "Other Startup",
      ],
      government: [
        "Local Government",
        "State Government",
        "Federal Agency",
        "Public Institution",
        "Military Organization",
        "Other Government",
      ],
      other: [
        "Event Management",
        "Media & Entertainment",
        "Sports Organization",
        "Cultural Organization",
        "Professional Association",
        "Other",
      ],
    };
    return subCategories[category] || [];
  };

  const validateForm = () => {
    if (!orgData.name.trim() || !orgData.email.trim() || !orgData.phone.trim()) {
      toast.warning("Please fill all required fields");
      return false;
    }
    if (!orgData.category) {
      toast.warning("Please select a category");
      return false;
    }
    if (!orgData.subCategory) {
      toast.warning("Please select a sub-category");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orgData.email)) {
      toast.warning("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(orgData.phone)) {
      toast.warning("Please enter a valid phone number");
      return false;
    }

    if (orgData.alternativePhone && !phoneRegex.test(orgData.alternativePhone)) {
      toast.warning("Please enter a valid alternative phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await api.post("/org/register/basic", { ...orgData });
      toast.success(response.data.message || "Organization created successfully");

      setOrgData({
        name: "",
        email: "",
        phone: "",
        alternativePhone: "",
        category: "",
        subCategory: "",
      });

      router.push("/org");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create organization",
        {
          description: error?.response?.data?.error?.details || "Please try again later",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  if (userLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6 text-center">
        <p className="text-lg text-muted-foreground animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-background flex items-center justify-center px-4 sm:px-6 md:px-16"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-card shadow-xl rounded-xl p-6 md:p-8 w-full max-w-4xl"
      >
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Create Organization
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Organization Name</Label>
            <Input
              id="name"
              name="name"
              value={orgData.name}
              onChange={handleChange}
              placeholder="Enter organization name"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Organization Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={orgData.email}
              onChange={handleChange}
              placeholder="Enter organization email"
              required
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={orgData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Alternative Phone */}
          <div className="space-y-2">
            <Label htmlFor="alternativePhone">
              Alternative Phone (Optional)
            </Label>
            <Input
              id="alternativePhone"
              name="alternativePhone"
              type="tel"
              value={orgData.alternativePhone}
              onChange={handleChange}
              placeholder="Enter alternative phone"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={orgData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categories</SelectLabel>
                  <SelectItem value="college">College</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="nonprofit">Non Profit</SelectItem>
                  <SelectItem value="startup">Start up</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Sub-Category */}
          {orgData.category && (
            <div className="space-y-2">
              <Label>Sub-Category</Label>
              <Select value={orgData.subCategory} onValueChange={handleSubCategoryChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sub-category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sub-Categories</SelectLabel>
                    {getSubCategories(orgData.category).map((subCat) => (
                      <SelectItem key={subCat} value={subCat}>
                        {subCat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Submit */}
          <div className="md:col-span-2 mt-4">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
