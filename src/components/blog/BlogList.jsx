import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import CoverImage from "./CoverImage";
import Author from "./Author";
import BlogInteraction from "./BlogInteraction";


export default async function BlogList({ posts }) {

  return (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post) => {
        return (
          <div
            key={post._id}
            className="
            col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-200 p-4 rounded-xl shadow-md
            "
          >

            <CoverImage {...post} />

            <div className="p-2 rounded-lg flex flex-col w-full justify-between flex-1">
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="mb-4 font-bold text-secondary-700">
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center  justify-between mb-4">
                <Author {...post.author} />
                <div className="flex items-center text-[10px] text-secondary-500">
                  <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                  <span className="ml-1"> خواندن:</span>
                  <span className="ml-1 leading-3">{post.readingTime}</span>
                  <span>دقیقه</span>
                </div>
              </div>

              <BlogInteraction post={post} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
