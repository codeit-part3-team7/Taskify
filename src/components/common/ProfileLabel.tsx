import React from "react";
import Avatar from "./Avatar";

interface ProfileLabelProps {
  data: any;
  profile?: boolean;
}

function ProfileLabel({ data, profile }: ProfileLabelProps) {
  //profile이 true인 경우 텍스트 반응형으로 숨김 처리.
  const labelType = profile ? "hidden mobile:block" : "";

  return (
    <div className="flex items-center gap-6">
      <Avatar profile />
      <span className={`text-14 tablet:text-16 text-black-3332 ${labelType}`}>중급 프로젝트</span>
    </div>
  );
}

export default ProfileLabel;
