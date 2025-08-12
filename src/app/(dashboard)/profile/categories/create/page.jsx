import Breadcrumbs from "@/ui/Breadcrumbs";
import CreateCategoryForm from "./_/CreateCategoryForm";

function createCategoryPage() {
  
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "دسته بندی ها",
            href: "/profile/categories",
          },
          {
            label: "ایجاد دسته بندی",
            href: "/profile/categories/create",
          },
        ]}
      />
      <CreateCategoryForm />
    </div>
  );
}
export default createCategoryPage;
