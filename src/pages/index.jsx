import { Card } from "@/components/module/card";
import { Footer } from "@/components/module/footer";
import { HeroSection } from "@/components/module/landing-page/hero-section";
import { NewRecipe } from "@/components/module/landing-page/newRecipe-section";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import { api } from "../configs/api";
import { HamburgerMenu } from "@/components/module/hamburger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [recipes, setRecipes] = useState();
  async function getRecipe() {
    try {
      const recipes = await api.get("recipes");
      setRecipes(recipes?.data?.data);
    } catch (error) {
      console.error("Failed to fetch recipes:", error);
    }
  }
  useEffect(() => {
    getRecipe();
  }, []);
  return (
    <main className="pb-10">
      <div className="bg-main-yellow h-16 w-full flex justify-between pl-10 lg:hidden">
        <Image src={"/auth/Group 697.svg"} width={30} height={30} alt="Logo" />
        <HamburgerMenu />
      </div>
      <div className="flex">
        <div className="hidden w-full bg-main-white lg:w-[90%] h-[800px] lg:flex flex-col justify-between">
          <NAVLINK />
          <HeroSection />
        </div>
        <div className="py-8 bg-main-white block w-full container lg:hidden">
          <HeroSection />
        </div>
        <div className="hidden lg:block bg-main-yellow lg:w-[30%] h-[800px]">
          <NAVAUTH py={"py-[10%]"} />
        </div>
      </div>
      <NewRecipe recipes={recipes} />
      <div className="bg-main-white lg:pt-60 h-screen">
        <div className="pl-[8%] py-10 flex gap-5 items-center">
          <div className="h-14 w-4 lg:h-36 lg:w-6 bg-main-yellow"></div>
          <h1 className="font-semibold text-2xl lg:text-[48px] text-[#3F3A3A]">
            Popular Recipe
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-3 gap-y-8 px-5 lg:pl-[10%] w-full mx-auto bg-main-white pb-28">
          {recipes?.map((item) => (
            <Card
              image={item?.image}
              title={item?.title}
              href={`/recipe/${item?.id}`}
              key={item?.id}
            />
          ))}
        </div>
        <div className="py-10 flex justify-center bg-main-white">
          <Link
            href={`/search/recipes?page=1`}
            className="-mt-10 mx-auto bg-main-yellow py-5 px-12 rounded text-[#fff] font-semibold"
          >
            See More
          </Link>
        </div>
        <Footer />
      </div>
    </main>
  );
}
