"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import useCreateCategory from "./useCreateCategory";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import SpinnerMini from "@/ui/SpinnerMini";

const schema = yup.object({
  title: yup
    .string()
    .min(5, "حداقل ۵ کاراکتر را وارد کنید")
    .required("عنوان ضروری است"),
  englishTitle: yup
    .string()
    .min(5, "حداقل ۵ کاراکتر را وارد کنید")
    .required("عنوان انگلیسی ضروری است"),
  description: yup
    .string()
    .min(10, "حداقل ۱۰ کاراکتر را وارد کنید")
    .required("توضیحات ضروری است"),
}).required();

function CreateCategoryForm() {
  const { isCreating, createCategory } = useCreateCategory();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      englishTitle: "",
      description: "",
    },
  });

  const onSubmit = (data) => {
    createCategory(data, {
      onSuccess: () => {
        router.push("/profile/categories");
      },
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        label="عنوان :"
        name="title"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="عنوان انگلیسی :"
        name="englishTitle"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="توضیحات :"
        name="description"
        register={register}
        errors={errors}
        isRequired
      />
      {isCreating ? (
        <SpinnerMini />
      ) : (
        <Button className="w-full mt-2" type="submit" variant="primary">
          تایید
        </Button>
      )}
    </form>
  );
}

export default CreateCategoryForm;
