import Button from "../common/Button";
import SearchBar from "./SearchBar";

function InviteDashTable() {
    return (
        <div className="px-20 tablet:px-28">
            <div className="flex items-center justify-between pt-22 tablet:pt-26">
                <p className="text-20 font-bold tablet:text-24">초대받은 대시보드</p>
            </div>
            <div className="">
                <SearchBar />
            </div>
        
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">이름</p>
                <div>
                    <div className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE">
                        <div className="flex gap-x-1">
                            <Button variant="filled" buttonType="confirm">수락</Button>
                            <Button variant="ghost" buttonType="confirm">거절</Button>
                        </div>
                    </div>
                </div>
        </div>
    )  
  }
  
  export default InviteDashTable;