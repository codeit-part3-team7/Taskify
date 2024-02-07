import { createContext } from "react";
import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { dashboard } from "@/lib/services/dashboards";
import { Input } from "@/components/Auth/AuthInputField/Elements";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { UpdateTriggerProvider } from "@/components/contexts/TriggerContext";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { useDashboardData } from "@/hooks/useDashboardData";

type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
  columns: ColumnServiceResponseDto[];
};

export const DashboardContext = createContext<DashboardProps>({
  members: [],
  columns: [],
});

export default function Edit({ members, columns }: DashboardProps) {
  const { dashboardData, dashboardList, myData } = useDashboardData();
  const { dashboards } = dashboardList;

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    try {
      await dashboard("delete", Number(dashboardId));
      router.push("/mydashboard"); // 대시보드 삭제 시 mydashboard 페이지로 이동합니다.
    } catch (error) {
      console.error("대시보드 삭제 실패:", error);
    }
  };

  return (
    <UpdateTriggerProvider>
      <DashboardContext.Provider value={{ members, columns }}>
        <BoardLayout
          sideMenu={<SideMenu dashboards={dashboards} />}
          dashboardHeader={<DashboardHeader myData={myData} dashboardData={dashboardData} members={members} />}>
          <div className="px-12 pt-16 tablet:px-20 tablet:pt-20 pc:w-620">
            <BackButton />
            <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
              <div className="bg-white px-20 rounded-8">
                <div className="flex flex-col gap-y-10 pt-27 pb-20 tablet:pt-32 tablet:pb-37 tablet:flex-row tablet:justify-between tablet:items-center tablet:gap-y-0">
                  <label className="text-20 font-bold" id="username">
                    {dashboardData?.title}
                  </label>
                  {/* 여기 대시보드 생성 모달 참고하기 */}
                  <ChipColors selectColor={dashboard.color} setSelectColor={() => setSelectColor(dashboard.color)} />
                </div>
                <p className="text-16 tablet:text-18 font-medium pt-10 pb-10">대시보드 이름</p>
                {/* 여기두.. */}
                <Input />
                <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
                  <Button variant="filled_4" buttonType="comment">
                    변경
                  </Button>
                </div>
              </div>
              <MemberTable />
              <InviteListTable />
            </div>
            <DeleteDashButton onClick={() => handleDeleteDashboard()} />
          </div>
        </BoardLayout>
      </DashboardContext.Provider>
    </UpdateTriggerProvider>
  );
}
