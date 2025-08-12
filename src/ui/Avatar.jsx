import Image from "next/image";

function Avatar({ src }) {
   if (!src) return null;
   
  return (
    <div className="w-7 h-7 relative rounded-full ring-1 ring-secondary-300 ml-2 overflow-hidden">
      <Image
        src={src}
        alt="avatar image"
        fill
        className="object-cover"
      />
    </div>
  );
}

export default Avatar;
