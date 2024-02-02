import AuthLayout from "@/layouts/auth";
import AuthCheckbox from "@/components/Auth/AuthCheckbox";
import EmailField from "@/components/Auth/EmailField ";
import NameField from "@/components/Auth/NameField";
import PasswordField from "@/components/Auth/PasswordField";
import PasswordCheckField from "@/components/Auth/PasswordCheckField";

export default function SignUp() {
  return (
    <AuthLayout type="signUp" disabled>
      <EmailField />
      <NameField />
      <PasswordField />
      <PasswordCheckField />
      <AuthCheckbox />
    </AuthLayout>
  );
}
