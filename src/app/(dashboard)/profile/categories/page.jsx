import { Suspense } from "react";
import Fallback from "@/ui/Fallback";
import CategoryTable from "./_/CategoryTable";
import { CreateCategory } from "./_/Buttons";

function page() {
  return (
    <div>
      <div className="flex justify-between items-center text-secondary-600 mb-12">
        <h1 className="text-2xl font-bold">لیست دسته بندی ها</h1>
        <CreateCategory />
      </div>

      <Suspense fallback={<Fallback />}>
        <CategoryTable />
      </Suspense>
    </div>
  );
}

export default page;

// what is pagination?
// you have 100 data how you cat get this data from backend?

// 1. 100 => get all 100 data and => map

// 2.100 => get this 100 data 10 by 10 in deferent pages= >
// 100 % 10 => 10 page with limit 10 => each page get 10 data from backend => not all 100 data
// page1 : 10 data
// page 2 : 10 data
// page3 : ....

// the way 2  => is the pagination and it's can handeled by backend => the better way
// the way 1 => need a lot of codes in frontend
