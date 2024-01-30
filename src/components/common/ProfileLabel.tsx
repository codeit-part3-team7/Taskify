import React from "react";
import Avatar from "./Avatar";

interface ProfileData {
  nickname: string;
  profileImageUrl: string;
}

interface ProfileLabelProps {
  data: ProfileData;
  avatarType?: "default" | "modal" | "dropdown";
}

function ProfileLabel({ data, avatarType = "default" }: ProfileLabelProps) {
  const labelType = avatarType === "default" ? "hidden tablet:block" : "";
  const labelSize = avatarType === "modal" ? "text-12 tablet:text-14" : "text-14 tablet:text-16";

  return (
    <div className="flex items-center gap-6">
      <Avatar nickname={data.nickname} profileImageUrl={data.profileImageUrl} avatarType={avatarType} />
      <span className={`${labelSize} text-black-3332 ${labelType}`}>{data.nickname}</span>
    </div>
  );
}

export default ProfileLabel;
