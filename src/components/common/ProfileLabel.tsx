import React from "react";
import Avatar from "./Avatar";

interface ProfileData {
  nickname: string;
  profileImageUrl: string;
}

interface ProfileLabelProps {
  data: ProfileData;
  avatarType?: "default" | "dropdown";
}

function ProfileLabel({ data, avatarType = "default" }: ProfileLabelProps) {
  //profile이 true인 경우 텍스트 반응형으로 숨김 처리.
  const labelType = avatarType === "default" ? "hidden mobile:block" : "";

  return (
    <div className="flex items-center gap-6">
      <Avatar nickname={data.nickname} profileImageUrl={data.profileImageUrl} avatarType={avatarType} />
      <span className={`text-14 tablet:text-16 text-black-3332 ${labelType}`}>{data.nickname}</span>
    </div>
  );
}

export default ProfileLabel;
