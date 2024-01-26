import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
}

function Avatar({ name, src }: AvatarProps) {
  const style = {
    background: src ? `url(${src})` : "orange",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const initial = name?.charAt(0);
  return (
    <div
      className={`flex items-center justify-center text-white border-2 border-white rounded-full h-38 w-38 tablet:h-34 tablet:w-34`}
      style={style}>
      <span>{initial}</span>
    </div>
  );
}

export default Avatar;
