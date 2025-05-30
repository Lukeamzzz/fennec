"use client";

import { useState } from "react";
import ProfileSection from "@/components/settings/profile/ProfileSection";
import Header_settings from "@/components/settings/shared/HeaderSettings";
import ButtonGroupSettings from "@/components/settings/shared/ButtonGroupSettings";
import SecurityPasswordSection from "@/components/settings/security/SecurityPasswordSection";
import NotificationSection from "@/components/settings/notifications/NotificationSection";
import AccountSection from "@/components/settings/account/AccountSection";

function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "security":
        return <SecurityPasswordSection />;
      case "notifications":
        return <NotificationSection />;
      case "account":
        return <AccountSection />;

      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="flex min-h-screen  p-2">
      <div className="flex-1 pt-5 pl-1">
        <Header_settings />
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <ButtonGroupSettings
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default AccountSettingsPage;
