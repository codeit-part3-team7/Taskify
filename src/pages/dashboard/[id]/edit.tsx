import { createContext } from "react";
import { useRouter } from "next/router";
import BackButton from "@/components/common/Button/BackButton";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";
import BoardLayout from "@/layouts/board";
import { dashboard } from "@/lib/services/dashboards";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import { UpdateTriggerProvider } from "@/components/contexts/TriggerContext";
import { ColumnServiceResponseDto } from "@/lib/services/columns/schema";
import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardEdit from "@/components/dashboard/DashboardEdit";
import { memberList } from "@/lib/services/members";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { GetServerSidePropsContext } from "next";

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
  const router = useRouter();
  const dashboardId = router.query.id;

  // 대시보드 삭제
  const handleDeleteDashboard = async () => {
    try {
      await dashboard("delete", Number(dashboardId));
      router.push("/mydashboard"); // 대시보드 삭제 시 mydashboard 페이지로 이동
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
              <DashboardEdit />
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

// member 불러오기(리팩토링 때 수정)
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const dashboardId = Number(context.query.id);
  const cookieValue = context.req.headers.cookie || "";
  const token = extractTokenFromCookie(cookieValue);

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data: members } = await memberList({ dashboardId }, config);

    return {
      props: {
        members: members?.members || [],
        columns: [],
      },
    };
  } catch (error) {
    console.error("데이터를 불러오는 데 실패했습니다.", error);
    return {
      props: {
        members: [],
        columns: [],
      },
    };
  }
}
