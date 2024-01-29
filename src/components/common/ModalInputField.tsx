import React from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelId: string;
  name: string;
  textArea?: boolean;
  required?: boolean;
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelId: string;
  name: string;
  textArea: true;
  required?: boolean;
}

type CombinedFieldProps = InputFieldProps | TextAreaFieldProps;

function ModalInputField({ labelId, name, textArea, required, ...props }: CombinedFieldProps) {
  const {
    register,
    trigger,
    formState: { errors },
  } = useFormContext();

  const triggerValidationOnBlur = async () => {
    await trigger(labelId);
  };

  const validationRules = {
    // API 연동되면 API에서 제공하는 errorMessage 출력
    ...(required && { required: "빈 값입니다." }),
  };

  const errorMessage = errors[labelId]?.message;
  const errorText = typeof errorMessage === "string" ? errorMessage : "";

  const fieldClass = `border-1 rounded-6 border-gray-D9D9 py-14 px-16`;

  return (
    <div className="flex flex-col gap-10">
      <label htmlFor={labelId}>
        {name}
        {required && <span className="text-violet">*</span>}
      </label>
      {textArea ? (
        <textarea
          {...register(labelId, validationRules)}
          className={`${fieldClass} resize-none`}
          id={labelId}
          onBlur={triggerValidationOnBlur}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          {...register(labelId, validationRules)}
          className={`${fieldClass} h-42 tablet:h-48`}
          id={labelId}
          type="text"
          onBlur={triggerValidationOnBlur}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      <span className="text-red text-14">{errorText}</span>
    </div>
  );
}

export default ModalInputField;
