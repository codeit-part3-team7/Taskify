import React from "react";
import Modal from "../common/Modal";

interface AlertModalProps {
  text: string;
  onClose: () => void;
}

function AlertModal({ text, onClose }: AlertModalProps) {
  return (
    <Modal onClose={onClose}>
      <div className="flex justify-center items-center h-full">
        <span>{text}</span>
      </div>
    </Modal>
  );
}

export default AlertModal;
