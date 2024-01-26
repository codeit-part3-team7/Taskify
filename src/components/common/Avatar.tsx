import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  profile?: boolean;
}

function Avatar({ name, src, profile }: AvatarProps) {
  const initial = name?.charAt(0) || "";

  const backgroundStyle = {
    background: src ? `url(${src})` : "orange",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const avatarStyle = profile ? "h-26 w-26" : "h-38 w-38 tablet:h-34 tablet:w-34";

  return (
    <div
      className={`flex items-center justify-center text-white border-2 border-white rounded-full ${avatarStyle}`}
      style={backgroundStyle}>
      <span className="text-12 tablet:text-16">{initial}</span>
    </div>
  );
}

export default Avatar;
