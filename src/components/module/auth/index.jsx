import Image from "next/image";
import Link from "next/link";

export const AuthPage = () => {
  return (
    <div className="absolute lg:relative bg-main-yellow/30 lg:bg-main-yellow/70 min-h-[900px] md:min-h-screen -z-10 lg:z-0 w-full lg:w-[40%]">
      <Link
        href={"/"}
        className="hidden lg:flex gap-2 items-center absolute top-5 left-5 lg:left-10 cursor-pointer z-10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="#000"
          className="w-5 inline-block pt-0.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span className="inline-block text-[#000] text-lg">Home</span>
      </Link>
      <Image
      alt="image"
        src={"/auth/image 15.png"}
        fill={true}
        className="h-full w-full opacity-30 lg:opacity-30 object-cover bg-no-repeat"
      />
      <Image
      alt="image"
        src={"/auth/Group 697.svg"}
        width={100}
        height={100}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
