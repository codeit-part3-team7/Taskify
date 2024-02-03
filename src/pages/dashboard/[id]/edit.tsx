import { useState } from "react";
import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import { AuthInputField } from "@/components/Auth/AuthInputField";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { dashboard, members as membersData, userData } from "@/lib/mockData";

export default function Edit() {
  const [selectColor, setSelectColor] = useState("");
  const { members } = membersData;

  return (
    <BoardLayout
      sideMenu={<SideMenu />}
      dashboardHeader={<DashboardHeader myData={userData} dashboardData={dashboard} members={members} />}>
      <div className="px-12 pt-16 tablet:px-20 tablet:pt-20 pc:w-620">
        {/* 되돌아가기 누르면 boardid로 이동 */}
        <BackButton />
        <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
          <div className="bg-white px-20 rounded-8">
            <div key={dashboard.title}>
              <p className="flex justify-between items-center pt-27 pb-10 text-20 font-bold">{dashboard.title}</p>
              <ChipColors selectColor={dashboard.color} setSelectColor={() => setSelectColor(dashboard.color)} />
            </div>
            <p className="text-16 font-medium pt-24 pb-16 tablet:text-18">대시보드 이름</p>
            {/* 숙희님이 수정하신 AuthInputField 반영될 예정
          <AuthInputField />  */}
            <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
              <Button variant="filled_4" buttonType="comment">
                변경
              </Button>
            </div>
          </div>
          <MemberTable />
          <InviteListTable />
        </div>
        <DeleteDashButton />
      </div>
    </BoardLayout>
  );
}
