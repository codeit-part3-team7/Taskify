import Image from "next/image";
import Link from "next/link";

function BackButton() {
  return (
    <Link href="/mydashboard" className="flex items-center animate-bounce">
      <Image width={18} height={18} src="/images/arrow.png" alt="arrow 이미지" className="transform scale-x-[-1]" />
      <span className="font-Pretendard text-16 font-medium">돌아가기</span>
    </Link>
  );
}

export default BackButton;
