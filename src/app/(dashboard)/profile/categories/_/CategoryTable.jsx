import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import { getCategoryApi } from "@/services/categoryService";
import CetegoryRow from "./CetegoryRow";

async function CategoryTable() {
  let categories = [];

  try {
    const { categories: fetchedCategories } = await getCategoryApi();
    categories = fetchedCategories;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  if (!categories.length) return <Empty resourceName="دسته بندی ای" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>دسته بندی</th>
        <th>توضیحات</th>
        <th>تاریخ ایجاد</th>
        <td>عملیات</td>
      </Table.Header>

      <Table.Body>
        {categories.map((category, index) => (
          <CetegoryRow key={category._id} category={category} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoryTable;
