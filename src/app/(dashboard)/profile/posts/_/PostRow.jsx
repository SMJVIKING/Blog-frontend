"use client";

import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/trancateText";
import { DeletePost, UpdatePost } from "./Buttons";

function PostRow({ post, index }) {
  const typeStyle = {
    free: {
      label: "رایگان",
      className: "badge--success",
    },
    premium: {
      label: "پولی",
      className: "badge--secondary",
    },
  };

  const { title, text, createdAt, type} = post;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(title, 30)}</td>
      <td>{truncateText(text, 30)}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${typeStyle[type].className}`}>
          {typeStyle[type].label}
        </span>
      </td>
      <td className="flex gap-x-2">
        <UpdatePost id={post._id} />
        <DeletePost post={post} />
      </td>
    </Table.Row>
  );
}
export default PostRow;
