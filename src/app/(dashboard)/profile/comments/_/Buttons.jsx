"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import useDeleteComment from "./useDeleteComment";
import ButtonIcon from "@/ui/ButtonIcon";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import useUpdateComment from "./useUpdateComment";

// delete :
export function DeleteComment({ id, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteComment } = useDeleteComment();
  const router = useRouter();

  return (
    <>
      <ButtonIcon variant="danger" onClick={() => setIsOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`حذف  ${title}`}
      >
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={title}
          onClose={() => setIsOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deleteComment(
              { id },
              {
                onSuccess: () => {
                  setIsOpen(false);
                  router.refresh("/profile/comments");
                },
              }
            );
          }}
        />
      </Modal>
    </>
  );
}

// update :
export function UpdateComment({ id, currentStatus, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const { isUpdating, UpdateComment } = useUpdateComment();
  const router = useRouter();

  const options = [
    { label: "رد شده", value: 0 },
    { label: "در انتظار تایید", value: 1 },
    { label: "تایید شده", value: 2 },
  ];

  const handleSave = () => {
    UpdateComment(
      { id, options: { status: selectedStatus } },
      {
        onSuccess: () => {
          onEdit(selectedStatus);
          setIsOpen(false);
          router.refresh("/profile/comments");
        },
      }
    );
  };

  return (
    <>
      <ButtonIcon variant="primary" onClick={() => setIsOpen(true)}>
        <PencilIcon />
      </ButtonIcon>

      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="تغییر وضعیت">
        <div className="p-4">
          <label htmlFor="status" className="block mb-2 font-medium text-secondary-600">
            وضعیت جدید را انتخاب کنید:
          </label>
          <select
            id="status"
            className="w-full p-2 border rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(Number(e.target.value))}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-4">
            <button
              className="px-4 py-2 bg-gray-300 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              لغو
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSave}
              disabled={isUpdating}
            >
              تایید
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

