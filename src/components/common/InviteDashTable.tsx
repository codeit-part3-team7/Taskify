import Button from "../common/Button";
import SearchBar from "./SearchBar";

function InviteDashTable() {
    return (
        <div className="px-20 tablet:px-28">
            <div className="flex items-center justify-between pt-22 tablet:pt-26">
                <p className="text-20 font-bold tablet:text-24">초대받은 대시보드</p>
            </div>
            <div className="pt-20">
                <SearchBar />
            </div>
            <div className="hidden tablet:grid tablet:grid-cols-3 tablet:pt-20">
                <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">이름</p>
                <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">초대자</p>
                <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">수락 여부</p>
            </div>
                <div className="tablet:grid tablet:grid-cols-3 py-12 border-b-1 border-gray-EEEE text-14 ">
                    <div className="flex pb-10 tablet:pb-0 gap-x-28 tablet:gap-x-0">
                        <p className="tablet:hidden text-14 text-gray-9FA6">이름</p>
                        <p>프로덕트 디자인</p>  
                    </div>
                    <div className="flex pb-16 tablet:pb-0 gap-x-16 tablet:gap-x-0">
                        <p className="tablet:hidden text-14 text-gray-9FA6">초대자</p>
                        <p>손동희</p>
                    </div>
                    <div className="flex gap-x-10">
                        <Button variant="filled_4" buttonType="confirm">수락</Button>
                        <Button variant="ghost" buttonType="confirm">거절</Button>
                    </div>
                </div>
                <div className="tablet:grid tablet:grid-cols-3 py-12 border-b-1 border-gray-EEEE text-14 ">
                    <div className="flex pb-10 tablet:pb-0 gap-x-28 tablet:gap-x-0">
                        <p className="tablet:hidden text-14 text-gray-9FA6">이름</p>
                        <p>프로덕트 디자인</p>  
                    </div>
                    <div className="flex pb-16 tablet:pb-0 gap-x-16 tablet:gap-x-0">
                        <p className="tablet:hidden text-14 text-gray-9FA6">초대자</p>
                        <p>손동희</p>
                    </div>
                    <div className="flex gap-x-10">
                        <Button variant="filled_4" buttonType="confirm">수락</Button>
                        <Button variant="ghost" buttonType="confirm">거절</Button>
                    </div>
                </div>
        </div>
    )  
  }
  
  export default InviteDashTable;