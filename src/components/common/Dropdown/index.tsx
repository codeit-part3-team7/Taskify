import Image from "next/image";
import arrowDown from "../../../../public/images/arrow_drop_down.png";
import { useState } from "react";
import Lists from "./Lists";

export interface SelectOption {
  title: string;
}

interface SelectProps {
  items: SelectOption[];
  value?: SelectOption;
  onChange?: (value: SelectOption | undefined) => void;
}

function Dropdown({ value, onChange, items }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative flex items-center justify-between w-full px-16 bg-white border-solid py-11 h-42 rounded-6 border-1 border-gray-D9D9 tablet:h-48 ">
      <span className="">{selectedItem}</span>
      <button type="button" className="" onClick={handleOpen}>
        <Image src={arrowDown} alt="arrowDown" width={26} height={26} />
      </button>
      {isOpen && <Lists items={items} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}
    </div>
  );
}

export default Dropdown;
