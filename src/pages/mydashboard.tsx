import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import BoardLayout from "@/layouts/board";
import { Mock_DashBoard, Mock_MyData } from "@/components/mypage/MockData";
import { useState } from "react";
import InviteDashTable from "@/components/common/InviteDashTable";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddTodoButton from "@/components/dashboard/AddTodoButton";
import PaginationButton from "@/components/common/Button/PaginationButton";
import NewDashModal from "@/components/modal/newDash";
import MyDashboardLayout from "@/layouts/board/mydashboard";

export default function MyDashboard() {
  const [myData, setMyData] = useState(Mock_MyData);
  const [dashboards, setDashboards] = useState(Mock_DashBoard);
  const [showNewDashModal, setShowNewDashModal] = useState(false);

  const handleAddNewDashModal = () => {
    setShowNewDashModal(true);
  };

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader myData={myData} />;

  return (
    <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
      <MyDashboardLayout>
        <div className="flex flex-col gap-8 tablet:gap-10 pc:gap-12">
          <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-8 tablet:gap-13 w-full">
            <AddTodoButton title="새로운 대시보드" onClick={handleAddNewDashModal} />
            <DashboardLinkButton id={1} title="테스트" createdByMe={true} color="#7ac555" />
            <DashboardLinkButton id={1} title="테스트" createdByMe={true} color="#7ac555" />
            <DashboardLinkButton id={1} title="테스트" createdByMe={true} color="#7ac555" />
            {showNewDashModal && <NewDashModal />}
          </div>
          <div className="flex justify-end">
            <PaginationButton />
          </div>
        </div>
        <div className="w-full bg-white rounded-8">
          <InviteDashTable />
        </div>
      </MyDashboardLayout>
    </BoardLayout>
  );
}
