import { NAVLINK } from "@/components/module/navbar";
import YouTubeEmbed from "@/components/module/video";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
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
    <main className="flex h-screen">
      <div className="bg-main-yellow w-[100px] h-[1100px] fixed"></div>
      <div className="w-full">
        <NAVLINK />
        <div className="flex relative">
          <div className="w-4/5 mx-36"></div>
          <div className="absolute left-[150px] top-5">
            <YouTubeEmbed videoId={"V8xOJVq43As"} />
            <h1 className="text-3xl font-semibold max-w-[800px] my-5">
              Beef Steak with Curry Sauce - [Step 4] Cut the condiment and then
              mix it
            </h1>
          </div>
          <div className="px-5">
            <h1 className="font-bold text-xl">Next</h1>
            {video.map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="bg-main-yellow relative w-[400px] h-[200px] flex justify-center items-center rounded-lg my-2 cursor-pointer">
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
                  href={`#`}
                  className="font-semibold text-xl py-5 cursor-pointer hover:underline"
                >
                  {item?.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
