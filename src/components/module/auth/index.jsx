import Image from "next/image";
import { useRouter } from "next/router";

export const AuthPage = () => {
  const router = useRouter();
  return (
    <div className="relative bg-main-yellow h-screen w-[40%]">
      <div
        className="flex gap-2 items-center absolute top-5 left-10 cursor-pointer z-10"
        onClick={() => router.push("/")}
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
      </div>
      <Image
        src={"/auth/image 15.png"}
        fill={true}
        className="h-full w-full opacity-30 object-cover bg-no-repeat"
      />
      <Image
        src={"/auth/Group 697.svg"}
        width={100}
        height={100}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};
