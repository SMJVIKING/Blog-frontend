// chanlenges we have :
// 1.handle state
// 2.validate form data
// 3.form submision

// react hook form => best solution => we use this package for our project
// formik
// -------------------------------------------------------------------------------
// اعتبار سنجی دوتاجا باید انجام بشه =>
// سمت فرانت و بک اند
// سمت فرانت رو ما اینجا پکیج  =>"nup" from => react hook form
//  استفاده میکنیم  => تو وب سایتش مراحلش هست
// -------------------------------------------------------------------------------

"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import SpinnerMini from "@/ui/SpinnerMini";
import { useAuth } from "@/context/AutContext";


const schema = yup
  .object({
    name: yup.string().min(5).max(30).required("نام و نام خانوادگی الزامی است"),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است")
  })
  .required();

function SignUp() {
const {
  register,
  handleSubmit,
  formState: { errors, isLoading },
} = useForm({
  resolver: yupResolver(schema),
  mode: "onTouched",
});


  const { signup } = useAuth();

  const onSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ثبت نام
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          name="name"
          label="نام و نام خانوادگی :"
          register={register}
          dir="ltr"
          isRequired
          errors={errors}
        />
        <RHFTextField
          name="email"
          label="ایمیل :"
          register={register}
          dir="ltr"
          isRequired
          errors={errors}
        />
        <RHFTextField
          name="password"
          label="رمز عبور :"
          register={register}
          dir="ltr"
          type="password"
          isRequired
          errors={errors}
        />

        <div>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Button className="w-full" type="submit" variant="primary">
              تایید
            </Button>
          )}
        </div>
      </form>

      <Link
        href="/signin"
        className="text-secondary-500 mt-6 text-center block"
      >
        ورود
      </Link>
    </div>
  );
}

export default SignUp;
