import { Suspense } from "react";
import CardWrapper from "./_components/CardWrapper";
import Fallback from "@/ui/Fallback";
import LatestPosts from "./_components/LatestPosts";

async function ProfilePage() {
  // چرا ما برای کارد اومدیم کامپوننت جدا ب اسم کاردرپر زدیم؟
  // چون هدفمون استفاده از ساسپنس هست چرا ؟ ساسپنس کمک میکنه
  // لود دیتا طولانی نشه و بهینه بشه

  return (
    <div>
      <h1 className="text-2xl mb-4 text-secondary-600">داشبورد</h1>
      <Suspense fallback={<Fallback />}>
        <CardWrapper />
      </Suspense>

      <h2 className="text-2xl mb-4 text-secondary-600">جدید ترین پست ها</h2>
      <Suspense fallback={<Fallback />}>
        <LatestPosts />
      </Suspense>
    </div>
  );
}

export default ProfilePage;
