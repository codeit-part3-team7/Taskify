import { Label, Input, ErrorMessage, InputContainer } from "./AuthInputField/Elements";
import { useState } from "react";

function EmailField({ ...props }) {
  const [errorMsg, setErrorMsg] = useState(null);
  return (
    <InputContainer auth>
      <Label id="email" auth>
        이메일
      </Label>
      <Input id="email" type="email" placeholder="이메일을 입력해 주세요" isError={!!errorMsg} auth {...props} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </InputContainer>
  );
}

export default EmailField;
