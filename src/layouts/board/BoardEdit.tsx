import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";

function BoardEdit() {
    return (
        <div className="bg-gray-FAFA px-20">
            <BackButton />
            <div className="rounded-8 gap-y-12">
                <div className="bg-white px-20">
                    <div className="flex justify-between items-center">
                        <p className="text-20 font-bold">비브리지</p>
                        {/* <Chip> */}
                    </div>
                    <p className="text-16 font-medium tablet:text-18">대시보드 이름</p>
                    {/* <input></input> */}
                    <Button variant="filled" buttonType="confirm">변경</Button>
                </div>
                <MemberTable /> 
                <InviteListTable />
            </div>
            <DeleteDashButton />
        </div>
    )
};
  
export default BoardEdit;


//mockdata 받아와서 적용하게 바꿔야됨 일단 껍데기만 냅다 만들어