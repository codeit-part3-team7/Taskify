import React from "react";
import Avatar from "./Avatar";

interface AvatarsProps {
  list: any[];
}
const VISIBLE_COUNT = 3;

function Avatars({ list }: AvatarsProps) {
  const count = list.length;
  const others = count - VISIBLE_COUNT;
  const isVisible = count > VISIBLE_COUNT;

  const position = ["left-0", "left-24 tablet:left-30", "left-48 tablet:left-60"];

  return (
    <div className="relative flex">
      {list.slice(0, VISIBLE_COUNT).map((data, index) => (
        <div key={index} className={`absolute ${position[index]}`}>
          <Avatar name={data.charAt()} />
        </div>
      ))}
      {isVisible && (
        <div className="absolute flex items-center justify-center border-2 border-white rounded-full h-38 w-38 left-72 tablet:left-90 bg-[#F4D7DA] text-[#D25B68] tablet:h-34 tablet:w-34">
          +{others}
        </div>
      )}
    </div>
  );
}

export default Avatars;
