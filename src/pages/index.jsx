import { Card } from "@/components/module/card";
import { Footer } from "@/components/module/footer";
import { HeroSection } from "@/components/module/landing-page/hero-section";
import { NewRecipe } from "@/components/module/landing-page/newRecipe-section";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import { api } from "./api/api";
import { useState } from "react";

export async function getServerSideProps() {
  const recipes = await api.get("v1/recipes");
  return { props: { recipes: recipes?.data?.data } };
}

export default function Home({ recipes }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const [page, setPage] = useState(1);
  return (
    <main className="pb-10">
      <div className="flex">
        <div className="bg-main-white w-[90%] h-[800px] flex flex-col justify-between">
          <NAVLINK />
          <HeroSection />
        </div>
        <div className="bg-main-yellow w-[30%] h-[800px]">
          <NAVAUTH py={"py-[10%]"} handleLogout={handleLogout} />
        </div>
      </div>
      <NewRecipe />
      <div className="bg-main-white pt-60 h-screen">
        <div className="pl-[8%] py-10 flex gap-5 items-center">
          <div className="h-36 w-6 bg-main-yellow"></div>
          <h1 className="font-semibold text-[48px] text-[#3F3A3A]">
            Popular Recipe
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-x-3 gap-y-8 pl-[10%] w-full mx-auto bg-main-white pb-28">
          {recipes?.map((item) => (
            <Card image={item?.image} title={item?.title} id={item?.id} />
          ))}
        </div>
        <div className="flex flex-wrap gap-2 justify-center pb-10 pt-3 bg-main-white">
          <button
            disabled={page < 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
          >
            {"<"}
          </button>
          {Array.from(new Array(5)).map((_, idx) => (
            <button
              onClick={() => setPage(idx)}
              className={`${
                page == idx ? "bg-main-blue" : "bg-main-yellow"
              } w-10 h-10 rounded flex items-center justify-center text-main-white`}
            >
              {idx + 1}
            </button>
          ))}
          <button
            disabled={page > 3}
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
          >
            {">"}
          </button>
        </div>
        <Footer />
      </div>
    </main>
  );
}
