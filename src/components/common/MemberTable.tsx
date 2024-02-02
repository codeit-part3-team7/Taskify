import Button from "./Button/Button";
import PaginationButton from "./Button/PaginationButton";
import ProfileLabel from "../common/ProfileLabel";

const MOCK_MEMBERS = [
    { nickname: "정만철", profileImageUrl: "" },
    { nickname: "김태순", profileImageUrl: "" },
    { nickname: "최주협", profileImageUrl: "" },
    { nickname: "윤지현", profileImageUrl: "" }
]


function MemberTable() {
    return (
    <div className="">
        <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
            <p className="text-20 font-bold tablet:text-24">구성원</p>
            <div className="flex items-center gap-x-12">
                <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
                <PaginationButton />
            </div>
        </div>
        <p className="text-gray-9FA6 text-14 pt-18 px-20 tablet:text-16 tablet:px-28">이름</p>
            {/* 아래 div안의 데이터가 1개일 때와 4번째 순서마다 border-b-1이 안보이는 기능은 기능구현 때 구현 */}                           
        {MOCK_MEMBERS.map((member, index) => (
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28">
                <ProfileLabel data={member} avatarType="table"/>
                <Button variant="ghost" buttonType="delete">삭제</Button>
            </div>
        ))}
    </div>
    )
  }
  
  export default MemberTable;
  