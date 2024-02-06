import Button from "./Button/Button";
import PaginationButton from "./Button/PaginationButton";
import ProfileLabel from "../common/ProfileLabel";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteMember, memberList } from "@/lib/services/members";
import { MemberListResponseDto } from "@/lib/services/members/schema";
import Image from "next/image";

function MemberTable() {
  const [members, setMembers] = useState([]);
  const router = useRouter();
  const dashboardId = router.query?.id;

  const getMembers = async () => {
    if (typeof dashboardId === "string") {
      const qs = { dashboardId: Number(dashboardId) };
      const memberData = (await memberList(qs)).data as MemberListResponseDto;
      if (memberData) setMembers(memberData.members);
    }
  };

  useEffect(() => {
    getMembers();
  }, [dashboardId]);

  const handleDeleteMember = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      await getMembers();
    } catch (error) {
      console.error("멤버 삭제 실패:", error);
    }
  };

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
      {members.map((member) => (
        <div
          className="flex items-center justify-between py-12 border-b-1 border-gray-EEEE px-20 tablet:px-28"
          key={member.id}>
          <ProfileLabel data={member} avatarType="table" />
          {member.isOwner ? (
            <div className="px-15 tablet:px-30">
              <Image src="/images/crown.png" alt="왕관 아이콘" width={24} height={24} />
            </div>
          ) : (
            <Button variant="ghost" buttonType="delete" onClick={() => handleDeleteMember(member.id)}>
              삭제
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MemberTable;
