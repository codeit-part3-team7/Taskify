import { useState } from "react";
import Modal from "../../common/Modal";
import CommentInput from "../input/CommentInput";
import TaskInfo from "./TaskInfo";

function TaskModal() {
  const hasOptionsbutton = true;

  return (
    <div className="flex px-12 py-12 tablet:px-32 tablet:py-28 w-327 tablet:w-730">
      <Modal hasOptionsbutton={hasOptionsbutton}>
        <TaskInfo />
        <CommentInput />
        <div></div>
      </Modal>
    </div>
  );
}

export default TaskModal;
