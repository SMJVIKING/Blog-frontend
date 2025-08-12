import { updateCommentApi } from "@/services/commentService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateComment() {
  const { isPending: isUpdating, mutate: UpdateComment } = useMutation({
    mutationFn: updateCommentApi,

    onSuccess: (data) => {
      toast.success(data.message);
    },

    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isUpdating, UpdateComment };
}