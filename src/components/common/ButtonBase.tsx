import React from 'react';

type Variant = "login" | "approve" | "deny" | "delete";

type ButtonBaseProps = {
  variant: Variant;
  content: string;
  disabled?: boolean;
};

const ButtonBase: React.FC<ButtonBaseProps> = ({ variant, content, disabled = false }) => {
  const variantClasses = (variant: Variant) => {
    switch (variant) {
      // 로그인 컴포넌트
      case "login":
        if (disabled) {
          return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-gray-9FA6 text-white tablet:px-236";
        }
        return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-violet text-white tablet:px-236";
      // 수락 컴포넌트
      case "approve":
        return "flex justify-center items-center w-109 px-37 py-7 bg-violet text-white border rounded-4 text-12 tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
      // 거절 컴포넌트
      case "deny":
        return "flex justify-center items-center w-109 px-37 py-7 border border-gray-D9D9 rounded-4 bg-white text-12 text-violet tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
      // 삭제 컴포넌트
      case "delete":
        return "flex justify-center items-center w-52 px-9 py-7 text-12 bg-white text-violet border border-gray-D9D9 rounded-4 tablet:w-84 tablet:h-32 tablet:text-14";
      default:
        return "";
    }
  };

  return (
    <button className={`${variantClasses(variant)}`} disabled={disabled}>
      {content}
    </button>
  );
};

export default ButtonBase;
