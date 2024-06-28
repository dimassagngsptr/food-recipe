import Image from "next/image";
import { useState } from "react";
import { Bookmark } from "../bookmark";
import { Like } from "../like";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCookie } from "@/utils/cookie";

export const HeaderDetail = ({
  image,
  title,
  handleLike,
  like,
  // handleSave,
  save,
}) => {
  const router = useRouter();
  const { token } = getCookie();
  const handleBookmarkClick = () => {
    handleLike("recipes/save");
  };
  const handleLikeClick = () => {
    handleLike("recipes/like");
  };
  return (
    <div className="relative">
      <h1 className="px-14 lg:px-0 mt-5 lg:mt-0 text-main-blue text-2xl lg:text-7xl text-center">
        {title}
      </h1>
      <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[400px] lg:w-[850px] lg:h-[550px] mx-auto my-5 lg:my-16">
        {token && (
          <div className="flex absolute bottom-4 right-6 z-10 gap-5">
            <Bookmark save={save} onClick={handleBookmarkClick} />
            <Like like={like} onClick={handleLikeClick} />
          </div>
        )}
        <Image
          alt="image"
          src={image}
          fill
          quality={100}
          className="object-cover rounded"
        />
      </div>
    </div>
  );
};
