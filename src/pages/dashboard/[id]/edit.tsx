import { useEffect, useState } from "react";
import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { useRouter } from "next/router";
import { dashboard } from "@/lib/services/dashboards";

export default function Edit() {
  const [dashboardData, setDashboardData] = useState({ title: "", color: "" });
  const [newTitle, setNewTitle] = useState("");
  const [selectColor, setSelectColor] = useState("");

  // URL에서 dashboardId 가져오기
  const router = useRouter();
  const dashboardId = router.query.dashboardId;

  useEffect(() => {
    const getData = async () => {
      const response = await dashboard("get", dashboardId);
      if (response.data) {
        setDashboardData(response.data);
        setSelectColor(response.data.color);
        setNewTitle(response.data.title);
      }
    };
    if (dashboardId) {
      getData();
    }
  }, [dashboardId]);

  const handleColorChange = (color) => {
    setSelectColor(color);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUpdateDashboard = async () => {
    await dashboard("put", dashboardId, { title: newTitle, color: selectColor });
  };

  const handleDeleteDashboard = (event) => {
    await dashboard("delete", dashboardId);
  };

  return (
    <BoardLayout sideMenu={<SideMenu />} dashboardHeader={<DashboardHeader />}>
      <div className="px-12 pt-16 tablet:px-20 tablet:pt-20 pc:w-620">
        <BackButton onClick={() => router.push(`/dashboard/${dashboardId}`)} />
        <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
          <div className="bg-white px-20 rounded-8">
            <div>
              <p className="pt-27 pb-10 text-20 font-bold">{dashboardData.title}</p>
              <ChipColors selectColor={selectColor} setSelectColor={handleColorChange} />
            </div>
            {/* input 가져다 쓰기*/}
            <input
              type="text"
              value={newTitle}
              onChange={handleTitleChange}
              className="w-full h-42 flex-shrink-0 rounded-6 border bg-white"
            />
            <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
              <Button variant="filled_4" buttonType="comment" onClick={handleUpdateDashboard}>
                변경
              </Button>
            </div>
          </div>
          <MemberTable />
          <InviteListTable />
        </div>
        {/* 누르면 대시보드 삭제하는 기능 */}
        <DeleteDashButton onClick={handleDeleteDashboard} />
      </div>
    </BoardLayout>
  );
}
