import AuthLayout from "@/layouts/auth";
import EmailField from "@/components/Auth/EmailField ";
import PasswordField from "@/components/Auth/PasswordField";

export default function Login() {
  return (
    <AuthLayout type="logIn" disabled>
      <EmailField />
      <PasswordField />
    </AuthLayout>
  );
}
