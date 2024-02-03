import Button from "./Button/Button";
import PaginationButton from "./Button/PaginationButton";
import ProfileLabel from "../common/ProfileLabel";
import { members as membersData } from "@/lib/mockData";
import { useEffect, useState } from "react";
import { deleteMember, memberList } from "@/lib/services/members";
import { findDashboard } from "@/lib/services/dashboards";

function MemberTable() {
  // const { members } = membersData;

  // dashboardId 조회 함수 만들기
  const [dashboardId, setDashboardId] = useState(null);
  const getDashboardId = async () => {
    try {
      const response = await findDashboard();
      if (response.data && response.data.length > 0) {
        setDashboardId(response.data[0].id);
      }
    } catch (error) {
      console.error("대시보드 조회 실패:", error);
    }
  };

  // 멤버 조회 함수 만들기
  const [members, setMembers] = useState([]);
  const getMembers = async (dashboardId) => {
    try {
      const response = await memberList(dashboardId);
      setMembers(response.data);
    } catch (error) {
      console.error("대시보드의 멤버가 아닙니다:", error);
    }
  };

  // 멤버 삭제 함수 만들기
  const handleDeleteMember = async (memberId) => {
    try {
      await deleteMember(memberId);
      getMembers(dashboardId); // 멤버 목록 업데이트
    } catch (error) {
      console.error("멤버 삭제 실패:", error);
    }
  };

  useEffect(() => {
    getDashboardId();
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
      {/* 멤버 조회하기 */}
      {members.map((member) => (
        <div
          className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
          key={member.id}>
          <ProfileLabel data={member} avatarType="table" />

          {/* handleDeleteMember 사용 */}
          <Button variant="ghost" buttonType="delete">
            {/* onClick={() => handleDeleteMember(member.id)}> */}
            삭제
          </Button>
        </div>
      ))}
    </div>
  );
}

export default MemberTable;
