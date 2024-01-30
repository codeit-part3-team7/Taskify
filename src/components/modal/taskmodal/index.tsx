import { ChipCard, ChipProgress } from "@/components/common/Chips";
import Modal from "../../common/Modal";
import CommentInput from "../input/CommentInput";
import TaskInfo from "./TaskInfo";
import Image from "next/image";

function TaskModal() {
  const hasOptionsbutton = true;

  return (
    <Modal hasOptionsbutton={hasOptionsbutton}>
      <div className="grid grid-cols-1 gap-24 tablet:grid-cols-3 tablet:justify-start tablet:items-start w-327 tablet:w-730 ">
        <div className="grid grid-cols-1 col-span-1 grid-rows-4 gap-x-16 tablet:col-span-2">
          <div className="flex justify-center col-span-1 row-span-1 tablet:hidden tablet:col-span-1 tablet:justify-end">
            <TaskInfo />
          </div>
          <div className="flex w-full row-span-1 gap-20 mt-24">
            <ChipProgress />
            <Image src="/images/bar.png" alt="바 이미지" className="w-auto h-20" width={1} height={20} />
            <ChipCard />
          </div>
          <div className="w-full row-span-1 font-normal text-black h-72 font-Pretendard text-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus nibh arcu, quis consequat ante
            cursus eget. Cras mattis, nulla non laoreet porttitor, diam justo laoreet eros, vel aliquet diam elit at
            leo.
          </div>
          <div className="flex items-center justify-center flex-shrink-0 w-full h-20 row-span-1 pt-58">
            <Image src="/images/test.png" alt="테스트 이미지" width={450} height={20} />
          </div>
          <div className="row-span-1">
            <CommentInput />
          </div>
        </div>
        <div className="justify-center hidden tablet:flex tablet:col-span-1 tablet:justify-end">
          <TaskInfo />
        </div>
      </div>
    </Modal>
  );
}

export default TaskModal;
