import Button from "@/components/base/button";
import Image from "next/image";
import Link from "next/link";

export const NewRecipe = ({ recipes }) => {
  console.log(recipes);
  return (
    <div className="w-full h-full bg-main-white lg:pt-28">
      <div className="pl-6 lg:pl-[8%] pb-10 lg:pb-20 flex gap-5 items-center">
        <div className="h-20 w-4 lg:h-36 lg:w-6 bg-main-yellow"></div>
        <h1 className="font-semibold text-3xl lg:text-[48px] text-[#3F3A3A]">
          New Recipe
        </h1>
      </div>
      <div className="relative flex flex-col lg:flex-row justify-between pr-10">
        <div className="bg-main-yellow w-[100px] h-[350px] lg:w-[514px] lg:h-[600px] rounded"></div>
        <Image
          src={recipes[0]?.image}
          width={600}
          height={600}
          className="hidden lg:block lg:absolute top-16 left-24 lg:h-[600px] lg:w-[600px] object-cover"
        />
        <Image
          src="/landingpage/burger.png"
          width={300}
          height={300}
          className="absolute lg:hidden top-10 left-10"
        />
        <div className="flex flex-col w-full pl-8 lg:pl-0 py-5 lg:py-0 lg:w-[40%] justify-center">
          <h1 className="text-2xl lg:text-[56px] font-semibold text-center lg:text-start lg:py-10 lg:leading-tight">
            {recipes[0]?.title}
          </h1>
          <span className="hidden lg:inline-block bg-[#000] w-[100px] h-0.5 mt-2 mb-5 rounded"></span>
          <p className="text-md py-2 lg:py-0 lg:text-2xl text-center lg:text-start">
            {recipes[0]?.description}
          </p>
          <Link
            href={`/recipe/${recipes[0]?.id}`}
            className="text-center mx-auto lg:mx-0 bg-main-yellow py-2 rounded-md px-5 w-[200px] text-[#fff] font-bold my-10"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
};
