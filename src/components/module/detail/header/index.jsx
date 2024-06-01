import Image from "next/image";
import { useState } from "react";
import { Bookmark } from "../bookmark";
import { Like } from "../like";

export const HeaderDetail = ({ image, title, handleLike }) => {
  const [save, setSave] = useState(false);
  const [like, setLike] = useState(false);
  const handleBookmarkClick = () => {
    setSave(!save);
    handleLike("recipes/save");
  };
  const handleLikeClick = () => {
    setLike(!like);
    handleLike("recipes/like");
  };
  return (
    <>
      <h1 className="text-main-blue text-7xl text-center">{title}</h1>
      <div className="relative w-[850px] h-[550px] mx-auto my-16">
        <div className="flex absolute bottom-4 right-6 z-10 gap-5">
          <Bookmark save={save} onClick={handleBookmarkClick} />
          <Like like={like} onClick={handleLikeClick} />
        </div>
        <Image src={image} fill quality={100} />
      </div>
    </>
  );
};
