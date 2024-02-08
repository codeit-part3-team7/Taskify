import Modal from "@/components/common/Modal";
import React from "react";
import { FieldValues } from "react-hook-form";

export type AlertType =
  | "passwordMismatch"
  | "emailInUse"
  | "userNotFound"
  | "serverError"
  | "profileSuccess"
  | "passwordSuccess"
  | "incorrectPassword"
  | "passwordSameError"
  | "";

interface AlertModalProps<T = void> {
  modalType: "alert" | "delete";
  alertType?: AlertType;
  deleteType?: "card" | "column";
  callback?: (data: FieldValues) => Promise<T>;
  onClose: () => void;
}

function AlertModal({ modalType, callback, onClose, alertType, deleteType }: AlertModalProps) {
  const alertMessage = {
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    emailInUse: "이미 사용중인 이메일입니다.",
    userNotFound: "존재하지 않는 유저입니다.",
    serverError: "서버 처리 중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
    profileSuccess: "프로필을 저장하였습니다.",
    passwordSuccess: "비밀번호가 변경되었습니다.",
    incorrectPassword: "현재 비밀번호가 틀렸습니다.",
    passwordSameError: "현재 비밀번호와 새 비밀번호가 동일합니다.",
  };

  const deleteMessage = {
    card: "해당 카드를 삭제합니다.",
    column: "컬럼의 모든 카드가 삭제됩니다.",
  };

  const text = {
    alert: alertType && `${alertMessage[alertType]}`,
    delete: deleteType && `${deleteMessage[deleteType]}`,
  };

  return (
    <>
      <Modal modalType={modalType} onClose={onClose} callback={callback}>
        <div className="flex items-center justify-center h-full">
          <span>{text[modalType]}</span>
        </div>
      </Modal>
    </>
  );
}

export default AlertModal;
