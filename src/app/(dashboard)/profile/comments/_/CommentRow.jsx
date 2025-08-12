"use client";

import { useState } from "react";
import { toPersianDigits } from "@/utils/numberFormatter";
import truncateText from "@/utils/trancateText";
import { toLocalDateShort } from "@/utils/dateFormatter";
import Table from "@/ui/Table";
import { DeleteComment, UpdateComment } from "./Buttons";

function CommentRow({ comment, index }) {
  const { _id, content, user, createdAt, status } = comment;

  const [commentStatus, setCommentStatus] = useState(status);

  const typeStyle = {
    0: { label: "رد شده", className: "badge--danger" },
    1: { label: "در انتظار تایید", className: "badge--secondary" },
    2: { label: "تایید شده", className: "badge--success" },
  };

  const handleEdit = (newStatus) => {
    setCommentStatus(newStatus);
  };

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(content.text, 30)}</td>
      <td>{user?.name || "کاربر حذف‌شده"}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span
          className={`badge ${typeStyle[commentStatus]?.className || "نامشخص"}`}
        >
          {typeStyle[commentStatus]?.label || "نامشخص"}
        </span>
      </td>
      <td className="flex gap-x-2">
        <UpdateComment
          id={_id}
          currentStatus={commentStatus}
          onEdit={handleEdit}
        />
        <DeleteComment id={_id} title={content.text} />
      </td>
    </Table.Row>
  );
}

export default CommentRow;
