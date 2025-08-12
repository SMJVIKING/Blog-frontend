import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "./_/CreatePostForm";

function createPostPage() {
  
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ایجاد پست",
            href: "/profile/posts/create",
          },
        ]}
      />
      <CreatePostForm />
    </div>
  );
}
export default createPostPage;
