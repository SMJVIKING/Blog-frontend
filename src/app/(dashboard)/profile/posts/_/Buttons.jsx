"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Modal from "@/ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import useDeletePost from "./useDeletePost";
import { useRouter } from "next/navigation";

export function CreatePost() {
  return (
    <Link
      href="/profile/posts/create"
      className="justify-self-end flex gap-x-2 py-3 items-center rounded-xl bg-primary-900 px-4 text-sm font-medium text-secondary-0 
      transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد پست</span>{" "}
      <PlusIcon className="w-6 font-bold" />
    </Link>
  );
}

export function DeletePost({ post: { _id: id, title } }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deletePost } = useDeletePost();
  const router = useRouter();

  return (
    <>
      <ButtonIcon variant="danger" onClick={() => setIsOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={`حذف ${title}`}
      >
        <ConfirmDelete
          disabled={isDeleting}
          resourceName={title}
          onClose={() => setIsOpen(false)}
          onConfirm={(e) => {
            e.preventDefault();
            deletePost(
              { id },
              {
                onSuccess: () => {
                  setIsOpen(false);
                   router.refresh("/profile/posts");
                },
              }
            );
          }}
        />
      </Modal>
    </>
  );
}

export function UpdatePost({ id }) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon variant="primary">
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
}
