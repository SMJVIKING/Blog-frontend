import Image from "next/image";
import Link from "next/link";

export default function CoverImage({ slug, coverImageUrl }) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
          className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
          fill
          src={coverImageUrl}
          alt="Blog Cover"
        />
      </Link>
    </div>

  );
}
