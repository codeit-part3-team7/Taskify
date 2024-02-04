import AuthLayout from "@/layouts/auth";
import AuthCheckbox from "@/components/Auth/AuthCheckbox";
import EmailField from "@/components/Auth/EmailField ";
import NameField from "@/components/Auth/NameField";
import PasswordField from "@/components/Auth/PasswordField";
import PasswordCheckField from "@/components/Auth/PasswordCheckField";
import AuthForm from "@/layouts/auth/Form";
import { useForm, useWatch } from "react-hook-form";

export default function SignUp() {
  const SIGN_UP_FORM = {
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    agreeCheck: false,
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty, touchedFields },
    setError,
    trigger,
  } = useForm({ defaultValues: SIGN_UP_FORM, mode: "onChange" });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  const password = useWatch({ control, name: "password" });

  const triggerPasswordCheck = () => {
    if (touchedFields.passwordCheck) {
      trigger("passwordCheck");
    }
  };

  return (
    <AuthLayout type="signUp">
      <AuthForm onSubmit={handleSubmit(onSubmit)} type="signUp" disabled={!isDirty || !isValid}>
        <EmailField name="email" control={control} errors={errors} />
        <NameField name="nickname" control={control} errors={errors} />
        <PasswordField name="password" control={control} errors={errors} triggerPasswordCheck={triggerPasswordCheck} />
        <PasswordCheckField name="passwordCheck" control={control} errors={errors} password={password} />
        <AuthCheckbox name="agreeCheck" control={control} />
      </AuthForm>
    </AuthLayout>
  );
}
