import { createCategoryApi } from "@/services/categoryService";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";


// این هوک از React Query برای مدیریت درخواست‌ها استفاده می‌کند:
export default function useCreateCategory() {
//  برای بروز رسانی :
    const queryClient = useQueryClient();

    // useMutation برای ارسال درخواست ایجاد دسته بندی به API استفاده می‌شود.:
  const { isPending: isCreating, mutate: createCategory } = useMutation({
    mutationFn: createCategoryApi,

    onSuccess: (data) => {
      toast.success(data.message);
    //  پاک کردن کش مرورگر مربوط ب دسته بندی ها :
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return { isCreating, createCategory };
}
