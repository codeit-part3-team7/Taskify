import Button from "../common/Button";
import InviteButton from "../common/InviteButton";
import PaginationButton from "../common/PaginationButton";

function InvitationTable() {
    return (
      <div className="px-20 tablet:px-28">
        <div className="flex items-center justify-between pt-22 tablet:pt-26">
            <p className="text-20 font-bold tablet:text-24">초대내역</p>
            <div className="flex items-center gap-x-12">
                <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
                <PaginationButton />
                <div className="hidden tablet:block">
                    <InviteButton variant="filled"/>
                </div>
            </div>
        </div>
        <div className="pt-18 flex items-center justify-between pb-12 tablet:">
            <p className="text-gray-9FA6 text-14 tablet:text-16">이메일</p>
            <div className="tablet:hidden">
                <InviteButton variant="filled"/>
            </div>
        </div>
            {/* 아래 div안의 데이터가 1개일 때와 5번째 순서마다 border-b-1이 안보이는 기능은 기능구현 때 구현 */}
        <div>
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                <p className="text-14">codeitA@codeit.com</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                <p className="text-14">codeitB@codeit.com</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                <p className="text-14">codeitC@codeit.com</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                <p className="text-14">codeitD@codeit.com</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
            <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                <p className="text-14">codeitE@codeit.com</p>
                <Button variant="ghost" buttonType="delete">취소</Button>
            </div>
        </div>
    </div> 
    )
  }
  
  export default InvitationTable;
  