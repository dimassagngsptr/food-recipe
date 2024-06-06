import { HeaderDetail } from "@/components/module/detail/header";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import Image from "next/image";
import { api } from "../api/api";
import { Footer } from "@/components/module/footer";
import Link from "next/link";
import { getCookie } from "@/utils/cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const [recipe, setRecipe] = useState({});
  const [like, setLike] = useState(false);
  const { likeRecepi } = useSelector((state) => state.user);
  const { query } = useRouter();
  const { token } = getCookie();
  const { data } = useSelector((state) => state.user);
  const getLikeLocal = async () => {
    const id = likeRecepi?.data?.find((item) => item?.recipe_id === query?.id);
    try {
      const like = await axios.get("/api/getLike", {
        params: {
          id: id?.id,
          user_id: data?.data?.id,
          recipe_id: query?.id,
        },
      });
      if (like?.data?.length > 0) {
        setLike(true);
      }
    } catch (error) {
      return error;
    }
  };
  const detailRecipes = async () => {
    try {
      const res = await api.get(`v1/recipes/${query?.id}`);
      setRecipe(res?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async (route) => {
    try {
      if (like == true) {
        const id = likeRecepi?.data?.find(
          (item) => item?.recipe_id === query?.id
        );
        console.log(id);
        const response = await api.delete(`v1/${route}/${id?.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(response?.data?.message);
        setLike(false);
      } else {
        const response = await api.post(
          `v1/${route}`,
          { recipe_id: recipe?.id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        await axios.post("/api/like", {
          id: response?.data?.data?.id,
          recipe_id: recipe?.id,
          user_id: data?.data?.id,
        });
        alert(response?.data?.message);
        setLike(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const video = [
    {
      image: "/detail/Rectangle 313.png",
      path: "",
      title:
        "Beef Steak with Curry Sauce - [Step 4] Cut the condiment and then mix it",
    },
    {
      image: "/detail/Rectangle 329.png",
      path: "",
      title:
        "Beef Steak with Curry Sauce - [Step 5] Saute condiments together until turn brown",
    },
    {
      image: "/detail/Rectangle 90.png",
      path: "",
      title:
        "Beef Steak with Curry Sauce - [Step 6] Roast beef until it’s medium rare",
    },
    {
      image: "/detail/Rectangle 91.png",
      path: "",
      title:
        "Beef Steak with Curry Sauce - [Step 7] Roast beef until it’s medium rare",
    },
  ];
  useEffect(() => {
    detailRecipes();
    getLikeLocal();
  }, [query?.id]);
  return (
    <main>
      <div className="flex justify-between">
        <NAVLINK />
        <NAVAUTH py="py-[3%]" />
      </div>
      <HeaderDetail
        image={recipe?.image}
        title={recipe?.title}
        handleLike={handleLike}
        like={like}
      />
      <div className="flex flex-col mx-auto w-2/3 px-[3%]">
        <h1 className="font-semibold text-4xl text-[#000] mb-5">Ingredients</h1>
        {recipe?.description?.split(/[\n:]/).map((item, i) => (
          <p key={i} className="text-3xl w-1/2 py-1">
            - {item}
          </p>
        ))}
      </div>
      <div className="flex flex-col gap-3 mx-auto w-2/3 px-[3%] mt-20">
        <h1 className="font-semibold text-4xl mb-5">Video Step</h1>
        {video.map((item, i) => (
          <div key={i} className="flex gap-5">
            <div className="bg-main-yellow relative w-[300px] h-[100px] flex justify-center items-center rounded-lg my-2 cursor-pointer">
              <Image
                src={item?.image}
                fill
                className="object-cover rounded-lg"
                quality={100}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#fff7"
                className="size-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Link
              href={`/recipe/video/${recipe?.id}`}
              className="font-semibold text-xl w-1/3 py-5 cursor-pointer hover:underline"
            >
              {item?.title}
            </Link>
          </div>
        ))}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#fff"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
      </div>
      <Footer />
    </main>
  );
}
