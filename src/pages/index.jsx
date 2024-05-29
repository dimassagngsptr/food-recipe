import { Card } from "@/components/module/card";
import { Footer } from "@/components/module/footer";
import { HeroSection } from "@/components/module/landing-page/hero-section";
import { NewRecipe } from "@/components/module/landing-page/newRecipe-section";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const items = [
    {
      image: "/landingpage/Rectangle 314.png",
      width: 400,
      height: 400,
      title: ["Chiken", "Kare"],
    },
    {
      image: "/landingpage/Rectangle 315.png",
      width: 400,
      height: 400,
      title: ["Bomb", "Chiken"],
    },
    {
      image: "/landingpage/Rectangle 316.png",
      width: 400,
      height: 400,
      title: ["Banana", "Smoothie Pop"],
    },
    {
      image: "/landingpage/Rectangle 317.png",
      width: 400,
      height: 400,
      title: ["Coffee Lava", "Cake"],
    },
    {
      image: "/landingpage/Rectangle 318.png",
      width: 400,
      height: 400,
      title: ["Sugar", "Salmon"],
    },
    {
      image: "/landingpage/Rectangle 319.png",
      width: 400,
      height: 400,
      title: ["Indian", "Salad"],
    },
  ];
  return (
    <main className="pb-10">
      <div className="flex">
        <div className="bg-main-white w-[90%] h-[800px] flex flex-col justify-between">
          <NAVLINK />
          <HeroSection />
        </div>
        <div className="bg-main-yellow w-[30%] h-[800px]">
          <NAVAUTH />
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
          <Card items={items} />
        </div>
        <Footer />
      </div>
    </main>
  );
}
