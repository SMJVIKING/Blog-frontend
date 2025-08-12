"use client";

import { createComment } from "@/lib/actions";
import SubmitButton from "@/ui/SubmitButton";
import TextArea from "@/ui/TextArea";
import { useActionState, useState , useEffect } from "react";
import toast from "react-hot-toast";


const initionalState = {
  error: "",
  message: "",
};

const CommentForm = ({ postId, parentId, onClose }) => {
  const [text, setText] = useState("");
  // in react v 19:
  const [state, formAction] = useActionState(createComment, initionalState); //useFormState in react v 18

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
      console.log("message:",state.message);
      
    }
    if (state?.error) {
      toast.error(state.error);
      console.log("message:",state.error);
    }
  }, [state]);

  return (
    <div>
      <div className="flex justify-center mt-4">
        <div className="max-w-md  w-full">
          <form
            className="space-y-7"
            // action={createComment.bind(null, postId, parentId)}
            action={async (formData) => {
              await formAction({ formData, postId, parentId });
            }}
          >
            <TextArea
              name="text"
              label="متن نظر"
              // value={text}
              isRequired
              onChange={(e) => setText(e.target.value)}
            />
            <div className="mt-8">
              <SubmitButton type="submit" className="w-full">
                تایید
              </SubmitButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CommentForm;

// => تو این تکست اریا -> نیازی ب value,onchange ,state نیس => اجباری نیست

// server actions : THIS ACTIONS RUN ON SERVER NOT USER BROWSER

// in this component we use server action for sumbit our form

// !! we can use this actions in server/client component

// 1. IN SERVER COMPONENT => add "use server"  inside your component

// 2. IN CLIENT COMPONENT =>
// 1.create an file for actions -> and write your action's in this file ->
// -> and write "use server"  inside your file
// 2. than add this file into your client component

// -----------------------------------------------------------------------------

// HINT :
// "use server" => فقط وقتی ک نیازه از اکشن استفاده کنیم -> هرجا دلت خواست نباید استفاده کنی
// "use client" => وقتی نیازه کامپوننت رو تبدیل ب کلاینت کامپوننت کنیم

// ------------------------------------------------------------------------------

// in actions =>
// ببین وقتی نیازه یسری پراپرتی های دیگه رو پاس بدی ب اکشن ها ک ->
// این پراپرتی ها از خود ای پی ای گرفته نمیشن یا از خود فرم نمیان باید از این روش استفاده کنی:
// اینجا ما ب ایدی پست و پرنت نیاز داشتیم و درحالی ک فرم دیتا فقط تکست رو ب ما میداد
// و شامل این دو تا دیتای دیگ نمیشد -> پس ما این روش رو استفاده کردیم تا همه دیتای مدنظرمون رو بغرستیم

//  action={createComment} => changed to => action={createComment.bind(null,postId,parent)}

// ------------------------------------------------------------------------------

// we use this hook : useActionState()  =>
// این هوک کارش ی چیز دیگس ولی هدف ما از استفاده ازش اینه ک => بیایم پیام ارور و موفقیت رو نشون بدیم

// ** hint : این اکشن رو با فرم اکشن باید ب این صورت بنویسی تا جواب بده =>  وگرنه ارور میده :
//   action={async (formData) =>{
//     await formAction({formData,postId,parentId});
//   }}