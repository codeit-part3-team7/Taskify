import BackButton from "@/components/common/Button/BackButton";
import Button from "@/components/common/Button/Button";
import DeleteDashButton from "@/components/common/Button/DeleteDashButton";
import { ChipColors } from "@/components/common/Chips";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";
import BoardLayout from ".";
import { useState } from "react";
import { AuthInputField } from "@/components/Auth/AuthInputField";
import SideMenu from "@/components/common/SideMenu";
import DashboardHeader from "@/components/common/DashboardHeader";

export const Mock_MyData = {
    id: 657,
    email: "dex@naver.com",
    nickname: "김진영",
    profileImageUrl: "",
    createdAt: "2024-01-29T17:38:10.326Z",
    updatedAt: "2024-01-29T17:38:10.326Z",
    };
    
export const Mock_DashBoard = [
    {
    id: 2564,
    title: "중급 프로젝트",
    color: "#7ac555",
    userId: 588,
    createdAt: "2024-01-26T22:22:53.928Z",
    updatedAt: "2024-01-26T22:22:53.928Z",
    createdByMe: true,
    }
];

export const Mock_Members = [
    {
      id: 2,
      userId: 2,
      email: "member1@example.com",
      nickname: "토게피",
      profileImageUrl: "",
      createdAt: "2024-01-30T13:07:45.642Z",
      updatedAt: "2024-01-30T13:07:45.642Z",
      isOwner: false,
    },
    {
      id: 3,
      userId: 3,
      email: "member2@example.com",
      nickname: "망나뇽",
      profileImageUrl: "",
      createdAt: "2024-01-30T13:07:45.642Z",
      updatedAt: "2024-01-30T13:07:45.642Z",
      isOwner: false,
    },
  ];

function BoardEdit() {

    const [ selectColor, setSelectColor ] = useState("")

    return (
        <BoardLayout type="editOrMypage" sideMenu={<SideMenu />} dashboardHeader={<DashboardHeader myData={Mock_MyData} dashboardData={Mock_DashBoard} members={Mock_Members}/>}>
            <div>
                <div className="bg-gray-FAFA pt-16 tablet:pt-20">
                <BackButton />
                <div className="flex flex-col gap-y-12 pt-21 pb-40 tablet:pb-48">
                        <div className="bg-white px-20 rounded-8">
                            {Mock_DashBoard.map(({ title, color }) => (
                                <div key={title}>
                                    <p className="flex justify-between items-center pt-27 pb-10 text-20 font-bold">{title}</p>
                                    <ChipColors selectColor={color} setSelectColor = { () => setSelectColor(color)} />
                                </div>
                            ))}
                            <p className="text-16 font-medium pt-24 pb-16 tablet:text-18">대시보드 이름</p>
                            {/* 숙희님이 수정하신 AuthInputField 반영될 예정
                            <AuthInputField />  */}
                            <div className="flex justify-end pt-16 tablet:pt-24 pb-20 tablet:pb-28">
                                <Button variant="filled_4" buttonType="comment">변경</Button>
                            </div>
                        </div>
                        <MemberTable />
                        <InviteListTable />
                    </div>
                </div>
                <DeleteDashButton />
            </div>
        </BoardLayout>
    )
};  
  
export default BoardEdit;