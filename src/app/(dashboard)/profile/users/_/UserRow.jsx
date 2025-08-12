"use client";

import { toPersianDigits } from "@/utils/numberFormatter";
import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import Avatar from "@/ui/Avatar";

function UserRow({ user, index }) {
  const { name, email, createdAt,avatarUrl } = user;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>
      <Avatar src={avatarUrl} alt={name} />
      </td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{toLocalDateShort(createdAt)}</td>
    </Table.Row>
  );
}

export default UserRow;
