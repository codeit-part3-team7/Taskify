import Button from "./Button/Button";
import PaginationButton from "./Button/PaginationButton";
import ProfileLabel from "../common/ProfileLabel";
import { useEffect, useState } from "react";
import { deleteMember, memberList } from "@/lib/services/members";
import { findDashboard } from "@/lib/services/dashboards";

function MemberTable() {
  const [dashboardId, setDashboardId] = useState(null);
  const [members, setMembers] = useState([]);

  // dashboardid 추출
  const extractDashboardIdFromUrl = () => {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const dashboardIndex = pathSegments.findIndex((segment) => segment === "dashboard");
    if (dashboardIndex !== -1 && pathSegments.length > dashboardIndex + 1) {
      return pathSegments[dashboardIndex + 1];
    }
    return null;
  };

  const getMembers = async (dashboardId) => {
    try {
      const { data } = await memberList(dashboardId, "/dashboardId");
      if (data && data.members) {
        setMembers(data.members);
      }
    } catch (error) {
      console.error("대시보드의 멤버가 아닙니다:", error);
    }
  };

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      getMembers(dashboardId);
    } catch (error) {
      console.error("멤버 삭제 실패:", error);
    }
  };

  useEffect(() => {
    const id = extractDashboardIdFromUrl();
    if (id) {
      setDashboardId(id);
    }
  }, []);

  useEffect(() => {
    if (dashboardId) {
      getMembers(dashboardId);
    }
  }, [dashboardId]);

  return (
    <div className="bg-white rounded-8">
      <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
        <p className="text-20 font-bold tablet:text-24">구성원</p>
        <div className="flex items-center gap-x-12">
          <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
          <PaginationButton />
        </div>
      </div>
      <p className="text-gray-9FA6 text-14 pt-18 px-20 tablet:text-16 tablet:px-28">이름</p>
      {/* 4명씩 페이지네이션, 본인은 왕관으로 나와서 삭제버튼 없는 기능 만들어야 될 듯 */}
      {members.map((member) => (
        <div
          className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
          key={member.id}>
          <ProfileLabel data={member} avatarType="table" />
          <Button variant="ghost" buttonType="delete" onClick={() => handleDeleteMember(member.id)}>
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
}

export default MemberTable;
