import { Suspense } from "react";
import Fallback from "@/ui/Fallback";
import CommentsTable from "./_/CommentsTable";

function page() {
  return (
    <div>
      <h1 className="text-secondary-600 mb-12 text-2xl font-bold">
        لیست نظرات
      </h1>

      <Suspense fallback={<Fallback />}>
        <CommentsTable />
      </Suspense>
    </div>
  );
}

export default page;
