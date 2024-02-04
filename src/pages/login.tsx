import AuthLayout from "@/layouts/auth";
import EmailField from "@/components/Auth/EmailField ";
import PasswordField from "@/components/Auth/PasswordField";
import AuthForm from "@/layouts/auth/Form";
import { useForm } from "react-hook-form";
import { login } from "@/lib/services/auth";
import { useRouter } from "next/router";
import AlertModal from "@/components/modal/alert";
import { useToggle } from "usehooks-ts";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [alertValue, alertToggle, setAlertValue] = useToggle();
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

  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);
      if (response.data) {
        const accessToken = response.data?.accessToken;
        localStorage.setItem("accessToken", accessToken);
        router.push("/mydashboard");
        return;
      }
      if (response.errorMessage) {
        switch (response.errorMessage) {
          case "존재하지 않는 유저입니다.":
            setError("email", {
              type: "manual",
              message: `${response.errorMessage}`,
            });
            break;
          case "비밀번호가 일치하지 않습니다.":
            setAlertValue(true);
            break;
        }
      }
    } catch (error) {
      alert("서버 처리중 에러가 발생했습니다. 잠시 후 다시 시도해주세요."); // 화면상에서 에러 표시 처리
    }
  };

  return (
    <>
      <AuthLayout type="logIn">
        <AuthForm onSubmit={handleSubmit(onSubmit)} type="logIn" disabled={!isDirty || !isValid}>
          <EmailField name="email" control={control} errors={errors} />
          <PasswordField name="password" control={control} errors={errors} />
        </AuthForm>
      </AuthLayout>
      {alertValue && <AlertModal modalType="alert" onClose={() => setAlertValue(false)} />}
    </>
  );
}
