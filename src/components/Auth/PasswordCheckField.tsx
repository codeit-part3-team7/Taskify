import { Label, Input, ErrorMessage, InputContainer } from "./AuthInputField/Elements";
import { useState } from "react";

function PasswordCheckField({ ...props }) {
  const [errorMsg, setErrorMsg] = useState(null);
  return (
    <InputContainer auth>
      <Label id="password" auth>
        비밀번호 확인
      </Label>
      <Input
        id="password"
        type="password"
        placeholder="비밀번호를 한번 더 입력해 주세요"
        isError={!!errorMsg}
        auth
        {...props}
      />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </InputContainer>
  );
}

export default PasswordCheckField;
