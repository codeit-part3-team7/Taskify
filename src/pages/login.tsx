import AuthLayout from "@/layouts/auth";
import EmailField from "@/components/Auth/EmailField ";
import PasswordField from "@/components/Auth/PasswordField";
import AuthForm from "@/layouts/auth/Form";
import { useForm } from "react-hook-form";

export default function Login() {
  const LOGIN_FORM = {
    email: "",
    password: "",
  };
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    setError,
  } = useForm({ defaultValues: LOGIN_FORM, mode: "onBlur" });

  const onSubmit = (data: object) => {
    console.log(data);
  };

  return (
    <AuthLayout type="logIn">
      <AuthForm onSubmit={handleSubmit(onSubmit)} type="logIn" disabled={!isDirty || !isValid}>
        <EmailField name="email" control={control} errors={errors} />
        <PasswordField name="password" control={control} errors={errors} />
      </AuthForm>
    </AuthLayout>
  );
}
