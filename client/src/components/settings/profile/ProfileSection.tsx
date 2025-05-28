import ProfilePhotoSection from "./ProfilePhotoSection";
import ProfileInfoSection from "./ProfileInfoSection";
import { Toaster } from "sonner";

function ProfileSection() {
  return (
    <>
      <div className="p-6">
        <ProfilePhotoSection />
        <ProfileInfoSection />
      </div>
      <Toaster position="bottom-right" />
    </>
  );
}

export default ProfileSection;
