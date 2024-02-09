import { useEffect, useState, createContext, useContext, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { extractTokenFromCookie } from "@/lib/util/extractTokenFromCookie";
import { ColumnServiceResponseDto, FindColumnsRequestDto } from "@/lib/services/columns/schema";
import { dashboard, findDashboard } from "@/lib/services/dashboards";
import { findColumns } from "@/lib/services/columns";
import { memberList } from "@/lib/services/members";
import { MemberApplicationServiceResponseDto } from "@/lib/services/members/schema";
import {
  FindDashboardsResponseDto,
  FindDashboardsRequestDto,
  DashboardApplicationServiceResponseDto,
} from "@/lib/services/dashboards/schema";
import DashboardHeader from "@/components/common/DashboardHeader";
import SideMenu from "@/components/common/SideMenu";
import BoardLayout from "@/layouts/board";
import Column from "@/components/dashboard/Column";
import AddColumnButton from "@/components/dashboard/AddColumnButton";
import AlertModal from "@/components/modal/alert";
import { checkLogin } from "@/lib/util/checkLogin";
type DashboardProps = {
  members: MemberApplicationServiceResponseDto[];
};
interface DashboardContextType {
  members: MemberApplicationServiceResponseDto[];
  columnsData: ColumnServiceResponseDto[];
  setColumnsData: Dispatch<SetStateAction<ColumnServiceResponseDto[]>>;
}

export const DashboardContext = createContext<DashboardContextType>({
  members: [],
  columnsData: [],
  setColumnsData: () => {},
});

export default function Dashboard({ members }: DashboardProps) {
  const [alertValue, setAlertValue] = useState(false);
  const [columnsData, setColumnsData] = useState<ColumnServiceResponseDto[]>([]);
  const [dashboardList, setDashboardList] = useState<FindDashboardsResponseDto>({
    cursorId: null,
    totalCount: 0,
    dashboards: [],
  });
  const [dashboardData, setDashboardData] = useState<DashboardApplicationServiceResponseDto>(
    {} as DashboardApplicationServiceResponseDto,
  );

  const router = useRouter();
  const dashboardId = Number(router.query.id);

  useEffect(() => {
    if (!checkLogin(router)) return;
    const getDashboard = async () => {
      const response = await dashboard("get", dashboardId);
      return response?.data as DashboardApplicationServiceResponseDto;
    };

    const getColumnsData = async () => {
      const qs: FindColumnsRequestDto = { dashboardId };
      const response = await findColumns(qs);
      if (response.data) {
        return response?.data.data;
      }
      if (response.errorMessage) {
        setAlertValue(true);
      }
    };

    const getDashboardsData = async () => {
      const qs: FindDashboardsRequestDto = { navigationMethod: "pagination", size: 999 };
      const response = await findDashboard(qs);
      if (response.data) {
        return response.data as FindDashboardsResponseDto;
      }
      if (response.errorMessage) {
        setAlertValue(true);
        return;
      }
    };

    Promise.all([getDashboard(), getColumnsData(), getDashboardsData()])
      .then(([dashboardData, columnsData, dashboardList]) => {
        setDashboardData(dashboardData);
        setColumnsData(columnsData as ColumnServiceResponseDto[]);
        setDashboardList(dashboardList as FindDashboardsResponseDto);
      })
      .catch((error) => {
        console.error(error);
        setAlertValue(true);
      });
  }, [router, dashboardId]);

  const { dashboards } = dashboardList;
  const sideMenu = <SideMenu dashboards={dashboards} />;
  const header = <DashboardHeader dashboardData={dashboardData} members={members} />;

  return (
    <DashboardContext.Provider value={{ members, columnsData, setColumnsData }}>
      <Head>
        <title>{dashboardData.title}</title>
      </Head>
      <BoardLayout sideMenu={sideMenu} dashboardHeader={header}>
        <div className="flex flex-col pc:flex-row">
          <ColumnList />
        </div>
        <AddColumnButton updateColumns={setColumnsData} />
      </BoardLayout>
      {alertValue && <AlertModal modalType="alert" alertType="serverError" onClose={() => setAlertValue(false)} />}
    </DashboardContext.Provider>
  );
}

function ColumnList() {
  const { columnsData, setColumnsData } = useContext(DashboardContext);
  return columnsData?.map((column) => {
    return (
      <div key={column.id}>
        <Column column={column} updateColumns={setColumnsData} />
      </div>
    );
  });
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const dashboardId = Number(context.query["id"]);
  if (isNaN(dashboardId)) {
    return {
      props: {
        error: "유효하지 않은 대시보드 ID입니다.",
        members: null,
      },
    };
  }
  const qs = {
    page: 1,
    size: 20,
    dashboardId,
  };

  const cookieValue = context.req.headers.cookie || "";

  if (!cookieValue) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const token = extractTokenFromCookie(cookieValue);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data: members } = await memberList(qs, config);
    if (!members) {
      return {
        redirect: {
          destination: "/mydashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        members: members?.members,
      },
    };
  } catch (error) {
    return {
      props: {
        error: "데이터를 불러오는 데 실패했습니다.",
        members: null,
      },
    };
  }
}
