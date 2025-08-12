import { createPostApi } from "@/services/postServices";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";


// این هوک از React Query برای مدیریت درخواست‌ها استفاده می‌کند:
export default function useCreatePost() {
//  برای بروز رسانی :
    const queryClient = useQueryClient();

    // useMutation برای ارسال درخواست ایجاد پست به API استفاده می‌شود.:
  const { isPending: isCreating, mutate: createPost } = useMutation({
    mutationFn: createPostApi,

    onSuccess: (data) => {
      toast.success(data.message);
    //   پاک کردن کش مرورگر مربوط ب پست ها :
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return { isCreating, createPost };
}
