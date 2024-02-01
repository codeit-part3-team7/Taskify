import Image from 'next/image';

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
        return "h-40 px-12 gap-8 border rounded-8 text-14 bg-white text-gray-7874 tablet:h-36 tablet:px-16 pc:h-40";
      default: 
        return ""; 
    }
  };

  const imageSrc = (variant: string) => {
    switch (variant) {
      case "filled":
        return '/images/add_box_white.png';
      case "ghost":
        return '/images/add_box_gray.png';
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

  const { width, height } = imageSize(variant);

  return (
    <button className={`flex items-center justify-center flex-shrink-0 ${buttonStyle(variant)}`}>
      <div className={`${imageContainerStyle(variant)}`}> 
        <Image
          src={imageSrc(variant)}
          alt="초대하기 아이콘"
          width={width}
          height={height} />
      </div>
      <p>{children}</p>
    </button>    
  );
}

export default IconButton;
