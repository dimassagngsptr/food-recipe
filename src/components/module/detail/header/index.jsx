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
      <Link href={`/recipe/update/${router?.query?.id}`}>
        <Image
          src={"/profile/edit-3.svg"}
          width={30}
          height={30}
          className="absolute right-[25%] bottom-[20%] lg:top-40 lg:z-10 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        />
      </Link>
      <h1 className="px-14 lg:px-0 mt-5 lg:mt-0 text-main-blue text-2xl lg:text-7xl text-center">
        {title}
      </h1>
      <div className="relative w-[300px] h-[200px] lg:w-[850px] lg:h-[550px] mx-auto my-5 lg:my-16">
        {token && (
          <div className="flex absolute bottom-4 right-6 z-10 gap-5">
            <Bookmark save={save} onClick={handleBookmarkClick} />
            <Like like={like} onClick={handleLikeClick} />
          </div>
        )}
        <Image
          src={image}
          fill
          quality={100}
          className="object-cover rounded"
        />
      </div>
    </div>
  );
};
