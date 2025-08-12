"use client";

import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import SpinnerMini from "@/ui/SpinnerMini";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

// اعتبارسنجی = validation
const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  // فرق بین editPost و createPost
  const isEditSession = Boolean(editId);
  const {
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      text,
      slug,
      briefText,
      readingTime,
      category,
      coverImage,
    };
  }
  const { isEditing, editPost } = useEditPost();
  const { categoriesData } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const { isCreating, createPost } = useCreatePost();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  // convert url link to file :
  useEffect(() => {
    if (prevCoverImageUrl) {
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId]);

  const onSubmit = (data) => {
    // FormData یک شیء ویژه در جاوا اسکریپت است که برای ارسال داده‌های فرم، مخصوصاً داده‌هایی که شامل فایل هستند، استفاده می‌شود.
    // این شیء به طور خودکار داده‌ها را به فرمتی تبدیل می‌کند که بک‌اند بتواند آن را پردازش کند.
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
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
        label="متن کوتاه :"
        name="briefText"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="متن :"
        name="text"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="اسلاگ :"
        name="slug"
        register={register}
        errors={errors}
        isRequired
      />
      <RHFTextField
        label="زمان مطالعه :"
        name="readingTime"
        register={register}
        errors={errors}
        isRequired
      />
      {/* use tanstack query for this input : */}
      <RHFSelect
        label="دسته بندی :"
        name="category"
        register={register}
        errors={errors}
        isRequired
        options={categoriesData}
      />

      {/* create file input with controller from react-hook-form package: */}
      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              label="انتخاب کاور پست"
              name="my-coverImage"
              errors={errors}
              isRequired
              {...rest}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                // show selected image:
                setCoverImageUrl(URL.createObjectURL(file));
                //  حل مشکل انتخاب عکس تکراری :
                event.target.value = null;
              }}
            />
          );
        }}
      />

      {coverImageUrl && (
        <div className=" relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />
          <ButtonIcon
            onClick={() => {
              setCoverImageUrl(null);
              // remove image from react-hook-form states:
              setValue("coverImage", null);
            }}
            variant="red"
            className="w-6 h-6 absolute left-2 top-2"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}

      {isCreating ? (
        <SpinnerMini />
      ) : (
        <Button className="w-full" type="submit" variant="primary">
          تایید
        </Button>
      )}
    </form>
  );
}

export default CreatePostForm;
