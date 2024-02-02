import { useState, useEffect } from "react";
import Button from "../common/Button/Button";
import SearchBar from "./SearchBar";
import Image from "next/image";

const MOCK_MEMBERS = [
  { dashboardname: "프로덕트 디자인", nickname: "손동희" },
  { dashboardname: "새로운 기획 문서", nickname: "안귀영" },
  { dashboardname: "유닛 A", nickname: "장혁" },
  { dashboardname: "유닛 B", nickname: "강나무" },
  { dashboardname: "유닛 C", nickname: "김태현" },
  { dashboardname: "유닛 D", nickname: "정혜진" },
];

function InviteDashTable() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults(MOCK_MEMBERS);
      return;
    }

    const filteredResult = MOCK_MEMBERS.filter(
      (member) =>
        member.dashboardname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.nickname.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(filteredResult);
  };

  useEffect(() => {
    handleSearch("");
  }, []);

  return (
    <div className="px-16 tablet:px-28 py-24 tablet:py-32">
      <p className="text-20 font-bold tablet:text-24">초대받은 대시보드</p>
      <div className="pt-20">
        <SearchBar onSearch={handleSearch} />
      </div>
      {searchResults.length > 0 ? (
        <>
          <div className="hidden tablet:grid tablet:grid-cols-3 tablet:pt-24">
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">이름</p>
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">초대자</p>
            <p className="text-gray-9FA6 text-14 pt-18 tablet:text-16">수락 여부</p>
          </div>
          {searchResults.map((member, index) => (
            <div key={index} className="tablet:grid tablet:grid-cols-3 py-12 border-b-1 border-gray-EEEE text-14">
              <div className="flex items-center pb-10 tablet:pb-0 gap-x-28 tablet:gap-x-0">
                <p className="tablet:hidden text-14 text-gray-9FA6">이름</p>
                <p className="text-14 tablet:text-16">{member.dashboardname}</p>
              </div>
              <div className="flex items-center pb-16 tablet:pb-0 gap-x-16 tablet:gap-x-0">
                <p className="tablet:hidden text-14 text-gray-9FA6">초대자</p>
                <p className="text-14 tablet:text-16">{member.nickname}</p>
              </div>
              <div className="flex gap-x-10">
                <Button variant="filled_4" buttonType="confirm">
                  수락
                </Button>
                <Button variant="ghost" buttonType="confirm">
                  거절
                </Button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div className="flex flex-col gap-20 my-50 justify-center items-center">
          <Image src="/images/no_invite.png" width={100} height={100} alt="초대 여부 이미지" />
          <p className="text-center font-normal font-Pretendard text-gray-9FA6 text-14 tablet:text-18">
            {searchResults.length === 0 ? "검색 결과가 없습니다." : "초대된 대시보드가 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
}

export default InviteDashTable;
