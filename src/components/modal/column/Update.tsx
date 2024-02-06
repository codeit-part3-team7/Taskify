import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useToggle } from "usehooks-ts";
import { column } from "@/lib/services/columns";
import Modal from "@/components/common/Modal";
import AlertModal from "../alert";
import { FormInputField } from "../input";

type ColumnData = {
  title: string;
  columnId: number;
};

interface UpdateColumnProps {
  columnData: ColumnData;
  callback: (data: FieldValues) => Promise<void>;
  onClose: () => void;
}
function UpdateColumnModal({ columnData: { title, columnId }, callback: callbackUpdate, onClose }: UpdateColumnProps) {
  const methods = useForm();
  const [deleteValue, deleteToggle, setDeleteValue] = useToggle();

  const callbackDelete = async () => {
    try {
      await column("delete", columnId);
    } catch (e) {
      Promise.reject();
    }
  };

  const rules = { required: "컬럼 이름을 입력해주세요." };

  return (
    <FormProvider {...methods}>
      <Modal
        title="컬럼 관리"
        modalType={"update"}
        onClose={onClose}
        onDelete={deleteToggle}
        callback={callbackUpdate}
        useFormData>
        <FormInputField labelName="title" labelTitle="이름" defaultValue={title} rules={rules} />
      </Modal>
      {deleteValue && (
        <AlertModal
          modalType="delete"
          onClose={() => {
            setDeleteValue(false);
          }}
          callback={async () => {
            await callbackDelete().then(() => onClose());
          }}
        />
      )}
    </FormProvider>
  );
}

export default UpdateColumnModal;
