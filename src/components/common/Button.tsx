import { ButtonHTMLAttributes } from "react";
// type Variant = "login" | "approve" | "deny" | "delete";

type Variant = "filled" | "ghost" | "ghost_gray";
type ButtonType = "auth" | "confirm" | "modal";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant;
  buttonType: ButtonType;
}

function Button({ variant, buttonType, children, ...props }: ButtonProps) {
  // const variantClasses = (): string => {
  //   switch (variant) {
  //     case "login":
  //       if (disabled) {
  //         return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-gray-9FA6 text-white tablet:px-236";
  //       }
  //       return "flex justify-center items-center flex-shrink-0 rounded-8 px-152 py-14 text-18 bg-violet text-white tablet:px-236";
  //     case "approve":
  //       return "flex justify-center items-center w-109 px-37 py-7 bg-violet text-white border rounded-4 text-12 tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
  //     case "deny":
  //       return "flex justify-center items-center w-109 px-37 py-7 border border-gray-D9D9 rounded-4 bg-white text-12 text-violet tablet:w-72 tablet:h-30 tablet:px-23 tablet:py-6 tablet:text-14 pc:w-84 pc:h-32 pc:px-29 pc:py-7";
  //     case "delete":
  //       return "flex justify-center items-center w-52 px-9 py-7 text-12 bg-white text-violet border border-gray-D9D9 rounded-4 tablet:w-84 tablet:h-32 tablet:text-14";
  //     default:
  //       return "";
  //   }
  // };

  const baseClasses = "flex justify-center items-center";
  const disabledClasses = props.disabled ? "bg-gray-9FA6" : "bg-violet";

  const variantClasses = {
    filled: `${disabledClasses} text-white rounded-8`,
    ghost: "bg-white border border-gray-D9D9 text-violet rounded-4",
    ghost_gray: "bg-white border border-gray-D9D9 text-gray-7874 rounded-4",
  };

  const sizeClasses = {
    auth: "w-351 h-50 tablet:w-520 tablet:h-50",
    confirm: "w-109 h-28 text-12 tablet:w-72 tablet:h-30 tablet:text-14 pc:w-84 tablet:h-32",
    modal: "w-138 h-42 text-14 tablet:w-120 tablet:h-48 tablet:text-16",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[buttonType]}`}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
export default Button;
