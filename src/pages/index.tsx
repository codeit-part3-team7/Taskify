import InviteDashTable from "@/components/common/InviteDashTable";
import InviteListTable from "@/components/common/InviteListTable";
import MemberTable from "@/components/common/MemberTable";

export default function Landing() {
  return <div>
    <MemberTable />
    <InviteListTable />
    <InviteDashTable />
  </div>;
}