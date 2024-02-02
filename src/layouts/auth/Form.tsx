import Button from "@/components/common/Button/Button";
import { AuthType } from ".";
import { ReactNode } from "react";
import { AUTH_MAPPING } from "@/lib/constants";
import { AuthType } from ".";
interface AuthFormProps {
  type: AuthType;
  children: ReactNode;
  disabled?: boolean;
}

function AuthForm({ type, children, disabled }: AuthFormProps) {
  const FORM_TYPE = AUTH_MAPPING[type];

  return (
    <section>
      <form className="flex flex-col gap-16">
        {children}
        <div className="pt-4">
          <Button variant="filled" buttonType="auth" disabled={disabled}>
            {FORM_TYPE.button}
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
