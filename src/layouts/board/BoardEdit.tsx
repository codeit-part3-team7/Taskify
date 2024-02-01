import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import DashboardHeader from "@/components/common/DashboardHeader";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import SideMenu from "@/components/common/SideMenu";


const mockdata = [
    { title:"비브리지", color: "#76a5ea" }
]

function BoardEdit() {
    return ( 
        <div>
            {/* <SideMenu />
            <DashboardHeader /> */}
            <div>
                <div className="bg-gray-FAFA px-12 pt-16 tablet:px-20 tablet:pt-20">
                <BackButton />
                <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
                    <div className="bg-white px-20 rounded-8">
                        {mockdata.map(({ title, color }) => (
                            <div key={title}>
                                <p className="flex justify-between items-center pt-27 pb-10 text-20 font-bold">{title}</p>
                                <ChipColors selectColor={color} setSelectColor={() => setSelectColor(color)} />
                            </div>
                        ))}
                        <p className="text-16 font-medium pt-24 pb-16 tablet:text-18">대시보드 이름</p>
                        <form>
                            {/* 여기 인풋 부분 수정해야됨 */}
                            <input className="pt-10 h-42px flex-shrink-0 rounded-6 border-gray-D9D9 bg-white"></input>
                        </form>
                        <div className="flex justify-end pb-20 tablet:pb-28">
                            <Button variant="filled_4" buttonType="comment">변경</Button>
                        </div>
                </div>
                    <MemberTable />
                    <InviteListTable />
                </div>
                <DeleteDashButton />
            </div>
            </div>
        </div>
        
    )
};
  
export default BoardEdit;