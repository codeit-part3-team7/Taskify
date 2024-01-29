import Button from "@/components/common/Button";

export default function Landing() {
  return <div>
    <Button variant="filled" width={500} height={100} fontsize={18}>로그인</Button>
    <Button variant="ghost" width={500} height={100} fontsize={16}>거절</Button>
    <Button variant="ghost_gray" width={500} height={100} fontsize={16}>취소</Button>
  </div>;
}