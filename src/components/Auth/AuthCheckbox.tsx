import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./AuthInputField/Elements";

function AuthCheckbox({ ...props }) {
  return (
    <div className="flex items-center mt-8 gap-8 ">
      <Checkbox />
      <Label id="TOS-checkbox" auth>
        이용약관에 동의합니다.
      </Label>
    </div>
  );
}
export default AuthCheckbox;
