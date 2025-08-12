import { Suspense } from "react";
import UsersTable from "./_/UserTable";
import Fallback from "@/ui/Fallback";

async function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-secondary-600 mb-16">لیست کاربران</h1>
      <Suspense fallback={<Fallback/>}>
        <UsersTable />
      </Suspense>
    </div>
  );
}

export default ProfilePage;
