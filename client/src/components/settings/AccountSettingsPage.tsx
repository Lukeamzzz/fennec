"use client";

import React, { useState } from "react";
import ProfileSection from "@/components/settings/profile/ProfileSection";
import ButtonGroupSettings from "@/components/settings/shared/ButtonGroupSettings";
import AccountSection from "@/components/settings/account/AccountSection";

function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "account":
        return <AccountSection />;

      default:
        return <ProfileSection />;
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <header className="ml-15 pt-10">
          <div className=" justify-between items-center mb-2">
            <h1 className="text-3xl pb-1 font-bold text-gray-800 capitalize">
              Ajustes
            </h1>
            <p className="text-gray-600">
              Visualiza la información de tu perfil
            </p>
          </div>

        </header>
        <div className="flex  shadow-md">

          <div className="flex-1 pt-5 pl-1">
          <div className="bg-white rounded-lg overflow-hidden ">
              <ButtonGroupSettings
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
              />
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
  );
}

export default AccountSettingsPage;
