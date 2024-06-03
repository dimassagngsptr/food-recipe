import { HeaderDetail } from "@/components/module/detail/header";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import Image from "next/image";
import { api } from "../api/api";
// import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Footer } from "@/components/module/footer";
import Link from "next/link";
import { getCookie, parseCookies } from "@/utils/cookie";
import axios from "axios";

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { req } = context;
  const cookies = parseCookies(req.headers.cookie);
  const { token } = cookies;
  const recipes = await api.get(`v1/recipes/${id}`);
  const user = await api.get("/v1/users/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return { props: { recipes: recipes?.data?.data, user: user?.data } };
}

export default function Page({ recipes, user }) {
  const { token } = getCookie();
  const handleLike = async (route) => {
    try {
      const response = await api.post(
        `v1/${route}`,
        { recipe_id: recipes?.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await axios.post("/api/like", { id: recipes?.id, user_id:user?.data?.id });
      alert(response?.data?.message);
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
  return (
    <main>
      <div className="flex justify-between">
        <NAVLINK />
        <NAVAUTH py="py-[3%]" />
      </div>
      <HeaderDetail
        image={recipes?.image}
        title={recipes?.title}
        handleLike={handleLike}
      />
      <div className="flex flex-col mx-auto w-2/3 px-[3%]">
        <h1 className="font-semibold text-4xl text-[#000] mb-5">Ingredients</h1>
        {recipes?.description?.split(/[\n:]/).map((item, i) => (
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
              href={`/recipe/video/${recipes?.id}`}
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
