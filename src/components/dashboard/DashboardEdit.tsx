import Button from "@/components/common/Button/Button";
import { Input } from "@/components/Auth/AuthInputField/Elements";
import { ChipColors } from "@/components/common/Chips";
import { useDashboardData } from "@/hooks/useDashboardData";

export default function DashboardEdit() {
  const { dashboardData } = useDashboardData();
  return (
    <div className="bg-white px-20 rounded-8">
      <div className="flex flex-col gap-y-10 pt-27 pb-20 tablet:pt-32 tablet:pb-37 tablet:flex-row tablet:justify-between tablet:items-center tablet:gap-y-0">
        <label className="text-20 font-bold" id="username">
          {dashboardData?.title}
        </label>
        {/* 여기 대시보드 생성 모달 참고하기 */}
        <ChipColors selectColor={dashboardData.color} setSelectColor={() => setSelectColor(dashboardData.color)} />
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
  );
}
