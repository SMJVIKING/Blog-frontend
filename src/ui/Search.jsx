"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function Search() {
  //useSearchParams:
  // ی هوک ک کمک میکنه تمام کوئری استرینگ هایی ک تو این یو ار ال هست روبتونیم بخونیم
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname(); //url موجود

  const formSubmit = (e) => {
    e.preventDefault();
    // search  parametr in this form's input=> get input's value
    const search = e.target.search;
    const searchValue = search.value;
    // new URLSearchParams(...): یک نمونه جدید از URLSearchParams می‌سازد که امکان تغییر پارامترها را فراهم می‌کند.
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page","1");
    
    if (searchValue) {
      // add key+value:
      newParams.set("search", searchValue);
    } else {
      // delete key :
      newParams.delete("search");
    }
    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <form className="relative" onSubmit={formSubmit}>
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        className="textField__input py-3 text-xs bg-secondary-0 shadow-md"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 ml-3 flex h-full items-center"
      >
        <MagnifyingGlassIcon className="h-4 text-secondary-400" />
      </button>
    </form>
  );
}
