import Button from "@/components/base/button";
import Image from "next/image";

export const NewRecipe = () => {
  return (
    <div className="w-full h-full bg-main-white pt-28">
      <div className="pl-[8%] pb-20 flex gap-5 items-center">
        <div className="h-36 w-6 bg-main-yellow"></div>
        <h1 className="font-semibold text-[48px] text-[#3F3A3A]">New Recipe</h1>
      </div>
      <div className="relative flex justify-between pr-10">
        <div className="bg-main-yellow w-[514px] h-[600px] rounded"></div>
        <Image
          src="/landingpage/burger.png"
          width={600}
          height={600}
          className="absolute top-16 left-24"
        />
        <div className="flex flex-col w-[40%] justify-center">
          <h1 className="text-[56px] font-semibold">
            Healthy Bone Broth Ramen (Quick & Easy)
          </h1>
          <span className="bg-[#000] w-[100px] h-0.5 mt-2 mb-5 rounded"></span>
          <p className="text-2xl">
            Quick + Easy Chicken Bone Broth Ramen- <br />
            Healthy chicken ramen in a hurry? That’s right!
          </p>
          <Button
            title={"Learn More"}
            className="bg-main-yellow py-2 rounded-md px-5 w-[200px] text-[#fff] font-bold my-10"
          />
        </div>
      </div>
    </div>
  );
};
