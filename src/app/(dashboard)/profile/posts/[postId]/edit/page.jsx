import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "../../create/_/CreatePostForm";
import { getPostById } from "@/services/postServices";
import { notFound } from "next/navigation";

async function editPage({ params: { postId } }) {
  const { post } = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
            active: true,
          },
        ]}
      />
      <CreatePostForm postToEdit={post} />
    </div>
  );
}

export default editPage;
