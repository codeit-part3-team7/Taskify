import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useFormContext, FieldValues } from "react-hook-form";

interface ModalProps<T = void> {
  children: ReactNode;
  title?: string;
  modalType?: "alert" | "create" | "update" | "delete";
  hasOptionsbutton?: boolean;
  useFormData?: boolean;
  callback?: (data: FieldValues) => T;
  onClose: () => void;
  onDelete?: () => void;
}

function Modal({ children, title, modalType, hasOptionsbutton, useFormData, callback, onClose, onDelete }: ModalProps) {
  const formContext = useFormContext();
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  const buttonMapping: Record<string, string> = {
    alert: "확인",
    create: "생성",
    update: "수정",
    delete: "삭제",
  };

  const isAlert = modalType === "alert";
  const isUpdate = modalType === "update";
  const isDelete = modalType === "delete";

  const stopEventBubbling = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleButtonClick = (data: FieldValues) => {
    if (callback) {
      callback(data);
    }
    onClose();
  };

  // CSR 환경에서만 접근
  useEffect(() => {
    const body = document.body;
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    body.appendChild(modalRoot);
    setPortalRoot(modalRoot);
    return () => {
      body.removeChild(modalRoot);
    };
  }, []);

  return (
    portalRoot &&
    createPortal(
      <div
        className="fixed inset-0 flex items-center justify-center w-full h-full modal-bg bg-black-overlay"
        onClick={onClose}>
        <div
          className="bg-white min-w-327 tablet:min-w-540 min-h-220 tablet:min-h-250: rounded-5 px-20 py-28 tablet:px-28 grid grid-rows-[auto,1fr,auto]"
          onClick={stopEventBubbling}>
          {/* 모달 헤더 영역 */}
          <header className="flex items-center justify-between modal-header mb-24 tablet:mt-4 tablet:mb-32">
            {!isDelete && <span className="font-bold text-black-3332 text-20 tablet:text-24">{title}</span>}
            {/**모달 헤더 버튼 영역 */}
            {hasOptionsbutton && (
              <div className="flex items-center gap-15">
                <button
                  onClick={() => {
                    //케밥 컴포넌트 생성 후 추가
                    console.log("kebab");
                  }}>
                  <Image src={"/images/kebab.png"} alt="kebab" width={28} height={28} />
                </button>
                <button onClick={onClose}>
                  <Image src={"/images/close.png"} alt="close" width={32} height={32} />
                </button>
              </div>
            )}
          </header>
          {/* 콘텐츠 영역 */}
          <div className="h-full overflow-auto">{children}</div>
          {/* 모달 푸터 영역 */}
          {modalType && (
            <footer className="flex flex-col tablet:flex-row tablet:justify-between mt-28 tablet:mt-32">
              {isUpdate && (
                <span className="underline text-nowrap text-gray-9FA6 cursor-pointer" onClick={onDelete}>
                  삭제하기
                </span>
              )}
              <div className="flex justify-center w-full gap-12 tablet:justify-end">
                {/* 버튼 컴포넌트 생성 후 변경 */}
                {!isAlert && <button onClick={onClose}>취소</button>}
                {useFormData && (
                  <button type="submit" onClick={formContext.handleSubmit(handleButtonClick)}>
                    {buttonMapping[modalType]}
                  </button>
                )}
                {!hasOptionsbutton && !useFormData && (
                  <button onClick={handleButtonClick}>{buttonMapping[modalType]}</button>
                )}
              </div>
            </footer>
          )}
        </div>
      </div>,
      document.body,
    )
  );
}

export default Modal;
