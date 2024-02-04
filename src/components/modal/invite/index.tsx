import { FormProvider, useForm } from "react-hook-form";
import Modal from "@/components/common/Modal";
import FormInputField from "../input/FormInputField";

function InviteModal({ onClose }: any) {
  const methods = useForm();

  const rules = { required: "빈 값은 안됨." };

  return (
    <FormProvider {...methods}>
      <Modal title="초대하기" modalType={"invite"} onClose={onClose} useFormData>
        <FormInputField labelName="name" labelTitle="이메일" type="email" rules={rules} />
      </Modal>
    </FormProvider>
  );
}

export default InviteModal;
