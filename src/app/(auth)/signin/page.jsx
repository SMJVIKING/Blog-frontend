"use client";

import { useAuth } from "@/context/AutContext";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import SpinnerMini from "@/ui/SpinnerMini";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";

// use yup package from react-hook-form for autherization :
const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    // در چ حالتی فرم اعتبارسنجی بشه؟ در حالت تاچ شدن فرم
    mode: "onTouched",
  });

  const { signin } = useAuth();

  const onSubmit = async (values) => {
    await signin(values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ورود به حساب کاربری
      </h1>
      <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          name="email"
          label="ایمیل :"
          register={register}
          isRequired
          dir="ltr"
          errors={errors}
        />
        <RHFTextField
          name="password"
          label="رمز عبور :"
          register={register}
          isRequired
          dir="ltr"
          errors={errors}
          type = "password"
        />
        <div>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Button variant="primary" className="w-full" type="submit">
              تایید
            </Button>
          )}
        </div>
      </form>
      <Link href="/signup" className="text-secondary-500 mt-6 text-center">
        ثبت نام
      </Link>
    </div>
  );
}
export default SignIn;
