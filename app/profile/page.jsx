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

  return (
    <div className="pb-4 h-full py-2">
      <div className="mx-auto max-w-7xl px-4 space-y-4">
        {/* Profile Header */}
        <ProfileHeader user={user} onLogout={handleLogout} className="md:pb-6" />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-4">
          {/* Left Column - Personal Info & Security */}
          <div className="lg:col-span-2 space-y-2 md:space-y-4 overflow-hidden">
            <PersonalInformation user={user} onUpdate={handleUpdateUser} className="h-fit" />
            <ChangePassword className="h-fit" />
          </div>

          {/* Right Column - Ticket History & Settings */}
          <div className="lg:col-span-1 space-y-6 overflow-hidden">
            <TicketHistory className="h-96" />
          </div>
        </div>
      </div>
    </div>
  );
}


