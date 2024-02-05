import { sentInvitations } from "@/lib/mockData";
import Button from "./Button/Button";
import IconButton from "./Button/IconButton";
import PaginationButton from "./Button/PaginationButton";
import { findInvitationDashboard, deleteInvitationDashboard } from "@/lib/services/dashboards";
import { useState, useEffect } from "react";

function InviteListTable() {
  const [invitations, setInvitations] = useState([]);

  const dashboardId = 2919;
  const qs = {};

  // 초대 목록을 조회하는 함수
  const getInvitations = async () => {
    try {
      const response = await findInvitationDashboard(dashboardId, qs);
      if (response && response.data) {
        setInvitations(response.data.invitations);
      }
    } catch (error) {
      console.error("초대 목록 조회 실패:", error);
    }
  };

  // 초대 취소함수
  const handleCancelInvitation = async (invitationId) => {
    try {
      await deleteInvitationDashboard(dashboardId, invitationId);
      getInvitations(); // 초대 목록 새로고침
    } catch (error) {
      console.error("초대 취소 실패:", error);
    }
  };

  // 컴포넌트 마운트 시 초대 목록 가져오기
  useEffect(() => {
    getInvitations();
  }, []);

  return (
    <div className="bg-white rounded-8">
      <div className="flex items-center justify-between pt-22 px-20 tablet:px-28 tablet:pt-26">
        <p className="text-20 font-bold tablet:text-24">초대내역</p>
        <div className="flex items-center gap-x-12">
          <p className="text-12 font-normal tablet:text-14">1 페이지 중 1</p>
          <PaginationButton />
          <div className="hidden tablet:block">
            <IconButton variant="filled" type="invite" />
          </div>
        </div>
      </div>
      <div className="pt-18 flex items-center justify-between pb-12 px-20 tablet:px-28">
        <p className="text-gray-9FA6 text-14 tablet:text-16">이메일</p>
        <div className="tablet:hidden">
          <IconButton variant="filled" type="invite" />
        </div>
      </div>
      {/* 5명씩 페이지 구분*/}
      <div>
        {invitations.map((invitation) => (
          <div
            className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
            key={invitation.id}>
            <p className="text-14">{invitation.invitee.email}</p>
            <Button variant="ghost" buttonType="delete" onClick={() => handleCancelInvitation(invitation.id)}>
              취소
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InviteListTable;
