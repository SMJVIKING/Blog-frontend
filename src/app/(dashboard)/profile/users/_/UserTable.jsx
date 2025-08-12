import { getAllUsersApi } from "@/services/authService";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import UserRow from "./UserRow";
import { cookies } from "next/headers";
import setCookiesOnReq from "@/utils/setCookieOnReq";

async function UsersTable() {
  try {
    const cookieStore = cookies();
    const options = setCookiesOnReq(cookieStore);

    const data = await getAllUsersApi(options);

    const users = data?.users || [];

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
  } catch (err) {
    return <Empty resourceName="کاربری" />;
  }
}


export default UsersTable;