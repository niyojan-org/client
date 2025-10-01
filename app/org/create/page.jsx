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

  // --- AUTH REDIRECT ---
  useEffect(() => {
    if (!userLoading && !isAuthenticated) {
      toast.error("Please log in to create an organization");
      router.replace("/auth?view=login");
    }
  }, [isAuthenticated, userLoading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setOrgData((prev) => ({
      ...prev,
      category: value,
      subCategory: "",
    }));
  };

  const handleSubCategoryChange = (value) => {
    setOrgData((prev) => ({
      ...prev,
      subCategory: value,
    }));
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
        "Other Educational Institute"
      ],
      corporate: [
        "Technology Company",
        "Financial Services",
        "Healthcare Organization",
        "Manufacturing Company",
        "Consulting Firm",
        "Retail Business",
        "Other Corporate"
      ],
      nonprofit: [
        "Charity Organization",
        "Religious Organization",
        "Community Service",
        "Environmental Group",
        "Educational Foundation",
        "Health & Wellness",
        "Other Non-Profit"
      ],
      startup: [
        "Tech Startup",
        "FinTech Startup",
        "Health Tech",
        "E-commerce",
        "SaaS Company",
        "Mobile App",
        "Other Startup"
      ],
      government: [
        "Local Government",
        "State Government",
        "Federal Agency",
        "Public Institution",
        "Military Organization",
        "Other Government"
      ],
      other: [
        "Event Management",
        "Media & Entertainment",
        "Sports Organization",
        "Cultural Organization",
        "Professional Association",
        "Other"
      ]
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

    // Optional: Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(orgData.email)) {
      toast.warning("Please enter a valid email address");
      return false;
    }

    // Optional: Phone validation (10+ digits)
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

      // Reset form
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 text-center">
        <p className="text-lg text-gray-600 animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen pt-24 px-6 md:px-20 bg-gray-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="bg-white shadow-xl rounded-xl p-8 max-w-6xl mx-auto w-full"
      >
        <h1 className="text-3xl font-bold text-navy mb-6">Create Organization</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-navy font-medium mb-2">Organization Name</label>
            <input
              type="text"
              name="name"
              value={orgData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-navy"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-navy font-medium mb-2">Organization Email</label>
            <input
              type="email"
              name="email"
              value={orgData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-navy"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-navy font-medium mb-2">Organization Phone</label>
            <input
              type="tel"
              name="phone"
              value={orgData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10,}"
              title="Please enter a valid phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-navy"
            />
          </div>

          {/* Alternative Phone */}
          <div>
            <label className="block text-navy font-medium mb-2">
              Alternative Phone <span className="text-gray-500 text-sm">(Optional)</span>
            </label>
            <input
              type="tel"
              name="alternativePhone"
              value={orgData.alternativePhone}
              onChange={handleChange}
              pattern="[0-9]{10,}"
              title="Please enter a valid phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-navy"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-navy font-medium mb-2">Select the Category</label>
            <Select value={orgData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Categorization</SelectLabel>
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

          {/* Sub Category */}
          {orgData.category && (
            <div>
              <label className="block text-navy font-medium mb-2">Select the Sub-Category</label>
              <Select value={orgData.subCategory} onValueChange={handleSubCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select the Sub-Category" />
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
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 bg-navy col-span-2 text-white py-2 px-6 rounded-lg font-semibold transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-navy/90"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
