import React from "react";
import Avatar from "./Avatar";

function ProfileLabel({ data, profile }: any) {
  const labelType = profile ? "hidden mobile:block" : "";

  return (
    <div className="flex items-center gap-6">
      <Avatar name={data.name} profile />
      <span className={`text-14 tablet:text-16 text-black-3332 ${labelType}`}>{data.name}</span>
    </div>
  );
}

export default ProfileLabel;
