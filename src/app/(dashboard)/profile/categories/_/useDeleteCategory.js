import { deleteCategoryApi } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

// این هوک از React Query برای مدیریت درخواست‌ها استفاده می‌کند:
export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,

    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return { isDeleting, deleteCategory };
}