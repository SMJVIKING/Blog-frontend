"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonIcon from "@/ui/ButtonIcon";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";
import Link from "next/link";
import useDeleteCategory from "./useDeleteCategory";


export function CreateCategory() {
  return (
    <Link
      href="/profile/categories/create"
      className="justify-self-end flex gap-x-2 py-3 items-center rounded-xl bg-primary-900 px-4 text-sm font-medium text-secondary-0 
      transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد دسته بندی</span>
      <PlusIcon className="w-6 font-bold" />
    </Link>
  );
}

export function DeleteCategory({ category: { _id: id, title } }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteCategory } = useDeleteCategory();
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
            deleteCategory(
              { id },
              {
                onSuccess: () => {
                  setIsOpen(false);
                  router.refresh("/profile/categories");
                },
              }
            );
          }}
        />
      </Modal>
    </>
  );
}

