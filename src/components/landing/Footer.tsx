import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex items-center justify-center w-full h-220 tablet:h-100">
      <div className="flex flex-col items-center tablet:flex-row tablet:justify-between tablet:gap-140 pc:gap-628">
        <div className="leading-normal font-400 text-12 tablet:text-16 font-Pretendard">©codeit - 2023</div>
        <div className="flex items-center justify-center gap-20 mt-12 tablet:mt-0 tablet:gap-32">
          <span className="leading-normal font-400 text-12 tablet:text-16 font-Pretendard">Privacy Policy</span>
          <span className="leading-normal font-400 text-12 tablet:text-16 font-Pretendard">FAQ</span>
        </div>
        <div className="flex gap-14 mt-68 tablet:mt-0">
          <Link href="/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/email.png" width={20} height={20} alt="이메일 로고" />
          </Link>
          <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/facebook.png" width={20} height={20} alt="facebook 로고" />
          </Link>
          <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <Image src="/images/instagram.png" width={20} height={20} alt="instagram 로고" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
