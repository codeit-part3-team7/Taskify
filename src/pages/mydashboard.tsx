import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import BoardLayout from "@/layouts/board";
import { Mock_DashBoard, Mock_MyData } from "@/components/mypage/MockData";
import { useState } from "react";
import InviteDashTable from "@/components/common/InviteDashTable";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddTodoButton from "@/components/common/AddTodoButton";

export default function MyDashboard() {
  const [myData, setMyData] = useState(Mock_MyData);
  const [dashboards, setDashboards] = useState(Mock_DashBoard);

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader myData={myData} />;

  return (
    <BoardLayout type="myDashboard" sideMenu={sideMenu} dashboardHeader={header}>
      <div className="flex flex-col gap-40 tablet:gap-44">
        <div className="flex gap-8 tablet:gap-13 w-full">
          <AddTodoButton title="새로운 대시보드" />
          <DashboardLinkButton id={1} title="테스트" createdByMe={true} color="#7ac555" />
          <DashboardLinkButton id={1} title="테스트" createdByMe={true} color="#7ac555" />
        </div>
        <div className="w-full bg-white rounded-8">
          <InviteDashTable />
        </div>
      </div>
    </BoardLayout>
  );
}
