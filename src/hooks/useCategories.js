"use client";

import { getCategoryApi } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

// اینجا از tanstack/react query استفاده میکنیم:

export function useCategories() {

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryApi,
  });

  const { categories: rawCategories = [] } = data || {};

  // {value,label }
  const categoriesData = rawCategories.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  // { title,entitle }
  const transformedCategories = rawCategories.map((item) => ({
    label: item.title,
    value: item.englishTitle,
  }));

  return { isLoading, categoriesData, transformedCategories };
}
