import { getAllUsersApi } from "@/services/authService";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import UserRow from "./UserRow";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookieOnReq";

async function UsersTable() {
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const { users } = await getAllUsersApi(options);

  if (!users.length) return <Empty resourceName="کاربری" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <td>پروفایل</td>
        <th>نام کاربر</th>
        <th>ایمیل کاربر</th>
        <th>تاریخ ورود</th>
      </Table.Header>

      <Table.Body>
        {users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}
export default UsersTable;
