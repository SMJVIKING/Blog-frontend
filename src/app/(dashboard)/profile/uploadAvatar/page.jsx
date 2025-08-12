"use client";

import { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { uploadAvatarApi } from "@/services/authService";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";

function Page() {
  const  router=useRouter();
  const [imageUrl, setImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setImageUrl(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const data = await uploadAvatarApi(formData, { withCredentials: true });
      
      if (data?.url) {
        setImageUrl(data.url);
        toast.success(data.message);
        router.refresh();
      }
    } catch (err) {
      toast.error(data.err?.response?.data?.message);
      setImageUrl(null);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <div className="w-full h-full rounded-full overflow-hidden border border-gray-300 shadow">
          {imageUrl ? (
            <Image
              src={imageUrl || null}
              alt="avatar"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-600 text-gray-400 text-sm">
             no image 
            </div>
          )}
        </div>

        <label
          htmlFor="avatar-upload"
          className={`absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full shadow cursor-pointer hover:bg-primary-600 transition-all ${
            isUploading ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          📷
        </label>

        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

        <Button variant="primary">
          تأیید
        </Button>

    </div>
  );
}

export default Page;


Page.jsx

