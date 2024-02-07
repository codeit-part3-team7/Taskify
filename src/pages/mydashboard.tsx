import { useState, useEffect, useCallback, createContext } from "react";
import { useRouter } from "next/router";
import BoardLayout from "@/layouts/board";
import MyDashboardLayout from "@/layouts/board/mydashboard";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import DashboardLinkButton from "@/components/mydashboard/DashboardLinkButton";
import AddDashBoardButton from "@/components/mydashboard/AddDashBoardButton";
import PaginationButton from "@/components/common/Button/PaginationButton";
import InviteDashTable from "@/components/common/InviteDashTable";
import NewDashModal from "@/components/modal/newDash";
import { findDashboard } from "@/lib/services/dashboards";
import { FindDashboardsRequestDto } from "@/lib/services/dashboards/schema";

interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export const MyDashBoardContext = createContext({ isTrigger: false, toggleTrigger: () => {} });

export default function MyDashboard() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isTrigger, setIsTrigger] = useState<boolean>(false);
  const router = useRouter();

  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader />;

  const handleAddNewDashBoard = () => {
    setIsModalOpen(true);
  };

  const toggleTrigger = useCallback(() => {
    setIsTrigger((prevState) => !prevState);
  }, []);

  useEffect(() => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));

    if (!accessTokenCookie) {
      alert("로그인이 필요합니다.");
      router.push("/login");
    }

    const getDashboards = async () => {
      try {
        const qs: FindDashboardsRequestDto = {
          navigationMethod: "pagination",
        };
        const res = (await findDashboard(qs)).data as any;
        setDashboards(res.dashboards);
      } catch (error) {
        console.error("대시보드를 불러오는 데 실패했습니다.");
      }
    };

    getDashboards();
  }, [isTrigger]);

  return (
    <MyDashBoardContext.Provider value={{ isTrigger, toggleTrigger }}>
      <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
        <MyDashboardLayout>
          <div className="flex flex-col gap-8 tablet:gap-10 pc:gap-12">
            <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-8 tablet:gap-13 w-full">
              <AddDashBoardButton title="새로운 대시보드" onClick={handleAddNewDashBoard} />
              {dashboards.map((dashboard) => (
                <DashboardLinkButton
                  key={dashboard.id}
                  id={dashboard.id}
                  title={dashboard.title}
                  createdByMe={dashboard.createdByMe}
                  color={dashboard.color}
                />
              ))}
              {isModalOpen && <NewDashModal onClose={() => setIsModalOpen(false)} />}
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
    </MyDashBoardContext.Provider>
  );
}
