import { Label, Input, ErrorMessage, InputContainer } from "./AuthInputField/Elements";
import { useState } from "react";

function NameField({ ...props }) {
  const [errorMsg, setErrorMsg] = useState(null);
  return (
    <InputContainer auth>
      <Label id="nickname" auth>
        닉네임
      </Label>
      <Input id="nickname" type="text" placeholder="닉네임을 입력해 주세요" isError={!!errorMsg} auth {...props} />
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
    </InputContainer>
  );
}

export default NameField;
