import BlogList from "@/components/blog/BlogList";

async function Category({ params }) {
const { categorySlug } = params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}`
  );
  const {
    data: { posts },
  } = await res.json();

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-lg text-secondary-600">{`پستی در این دسته بندی یافت نشد`}</p>
      ) : (
        <BlogList posts={posts} />
      )}
    </div>
  );
}
export default Category;
