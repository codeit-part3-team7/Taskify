import Image from 'next/image';
import { ReactNode } from "react";

interface IconButtonProps {
  variant?: "default" | "filled" | "ghost";
  children: string;
}

function IconButton({ variant = "default", children }: IconButtonProps) {
  const buttonStyle = (variant: string) => {
    switch (variant) {
      case "filled":
        return "h-28 px-12 gap-6 rounded-4px text-12 bg-violet text-white rounded-4 tablet:w-105 tablet:h-32 tablet:text-14 tablet:px-16"; 
      case "ghost":
        return "h-30 px-12 gap-8 border rounded-8 text-14 bg-white text-gray-7874 border-gray-D9D9 tablet:h-36 tablet:px-16 pc:h-40";
      default: 
        return ""; 
    }
  };

  const imageSrc = (variant: string, children: string) => {
    const key = `${variant}-${children}`;
    switch (key) {
      case "filled-초대하기":
        return "/images/add_box_white.png";
      case "ghost-초대하기":
        return "/images/add_box_gray.png";
      case "ghost-관리":
        return "/images/settings.png";
      default:
        return "";
    }
  };
  const imageSize = (variant: string) => {
    switch (variant) {
      case "filled":
        return { width: 16, height: 16 }; 
      case "ghost":
        return { width: 20, height: 20 }; 
      default:
        return { width: 20, height: 20 }; 
    }
  };

  const imageContainerStyle = (variant: string) => {
    return variant === "ghost" ? "hidden tablet:flex" : "flex";
  };

  const altText = `${children} 아이콘`

  const { width, height } = imageSize(variant);

  return (
    <button className={`flex items-center justify-center flex-shrink-0 ${buttonStyle(variant)}`}>
      <div className={`${imageContainerStyle(variant)}`}> 
        <Image
          src={imageSrc(variant, children)}
          alt={altText}
          width={width}
          height={height} />
      </div>
      {children}
    </button>    
  );
}

export default IconButton;
