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
import { Input, Label } from "@/components/Auth/AuthInputField/Elements";

export default function Edit() {
  const router = useRouter();
  const { dashboardId } = router.query;

  const [dashboardData, setDashboardData] = useState({ title: "", color: "" });
  const [newTitle, setNewTitle] = useState("");
  const [selectColor, setSelectColor] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (!router.isReady) return;
      try {
        const response = await dashboard("get", dashboardId);
        if (response.data) {
          setDashboardData(response.data);
          setSelectColor(response.data.color);
          setNewTitle(response.data.title);
        }
      } catch (error) {
        console.error("대시보드 데이터를 불러오지 못했습니다.:", error);
      }
    };

    getData();
  }, [router.isReady, dashboardId]);

  const handleColorChange = (color) => {
    setSelectColor(color);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUpdateDashboard = async () => {
    await dashboard("put", Number(dashboardId), { title: newTitle, color: selectColor });
  };

  // 대시보드 삭제 잘됨 야호
  const handleDeleteDashboard = async () => {
    try {
      await dashboard("delete", Number(dashboardId));
      router.push("/mydashboard");
    } catch (error) {
      console.error("대시보드 삭제 실패:", error);
    }
  };

  return (
    <BoardLayout sideMenu={<SideMenu />} dashboardHeader={<DashboardHeader />}>
      <div className="px-12 pt-16 tablet:px-20 tablet:pt-20 pc:w-620">
        <BackButton onClick={() => router.back()} />
        <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
          <div className="bg-white px-20 rounded-8">
            <div>
              <Label>{dashboardData.title}</Label>
              {/* 여기 대시보드 생성 모달 참고하기 */}
              <ChipColors selectColor={selectColor} setSelectColor={() => handleColorChange()} />
            </div>
            {/* 여기두.. */}
            <Input>
            <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
              <Button variant="filled_4" buttonType="comment" onClick={() => handleUpdateDashboard()}>
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
  );
}
