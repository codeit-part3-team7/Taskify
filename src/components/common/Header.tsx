import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const isLandingPage = router.pathname === "/";

  return (
    <div
      className={`flex items-center justify-between w-full h-70 pr-24 tablet:pr-40 pc:pr-80 pl-30 py-16 bg-white 
      ${isLandingPage ? "" : "border-b-1 border-b-gray-D9D9"}`}>
      <Link href="/" className="flex items-center">
        <Image width={29} height={33} src="/images/logo.png" alt="로고 이미지" />
        <Image width={80} height={22} src="/images/Taskify.png" alt="Taskify 이미지" className="hidden tablet:block" />
      </Link>
      <div className="flex gap-36">
        <Link href="/login" className="font-Pretendard text-16 font-normal">
          로그인
        </Link>
        <Link href="/signup" className="font-Pretendard text-16 font-normal">
          회원가입
        </Link>
      </div>
    </div>
  );
}

export default Header;
