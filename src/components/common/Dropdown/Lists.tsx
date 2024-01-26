import check from "../../../../public/images/check.png";
import Image from "next/image";
import { useState } from "react";
import { SelectOption } from ".";

interface ListProps {
  items: SelectOption[];
  selectedItem: string;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}

function Lists({ items, selectedItem, setSelectedItem }: ListProps) {
  return (
    <ul className="absolute left-0 flex flex-col w-full px-8 bg-white border-solid top-50 rounded-6 border-1 border-gray-D9D9 py-13 gap-13">
      {items.map((item: SelectOption) => (
        <li
          key={item.title}
          className="flex items-center gap-6 bg-white cursor-pointer hover:bg-gray-EEEE rounded-4 "
          value={item.title}
          onClick={() => setSelectedItem(item.title)}>
          <Image
            src={check}
            alt="selected"
            width={22}
            height={22}
            className={`${selectedItem === item.title ? "visible" : "invisible"}`}
          />
          {item.title}
        </li>
      ))}
    </ul>
  );
}

export default Lists;
