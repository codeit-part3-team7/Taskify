import React from "react";
import { ChipAdd } from "../common/Chips";

interface AddTodoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  onClick: () => void;
}

function AddTodoButton({ title, onClick }: AddTodoButtonProps) {
  const buttonClassName = `flex items-center gap-12 justify-center border rounded-8 h-60 tablet:h-70 w-full border-gray-D9D9 ${
    title === "새로운 대시보드" ? "bg-white text-black grow" : ""
  }`;

  return (
    <button className={buttonClassName} onClick={onClick}>
      <span className="text-16 tablet:text-18 font-bold">{title}</span>
      <ChipAdd />
    </button>
  );
}

export default AddTodoButton;
