import Image from "next/image";
import { SearchSection } from "../search-section";

export const HeroSection = () => {
  return (
    <div className=" w-full h-[80%] flex flex-col lg:px-[10%] gap-10 mb-14 justify-center">
      <div className="w-full lg:relative lg:flex lg:justify-between">
        <SearchSection />
        <div className="hidden lg:absolute lg:block -top-[120px] -right-40">
          <Image
            objectFit="cover"
            src="/landingpage/vector.png"
            width={350}
            height={400}
          />
          <Image
            objectFit="cover"
            src="/landingpage/vector.png"
            width={350}
            height={400}
          />
        </div>
        <Image
          objectFit="cover"
          src="/landingpage/salad.png"
          width={400}
          height={400}
          className="hidden lg:absolute lg:block -top-[200px] -right-80"
        />
        <Image
          objectFit="cover"
          src="/landingpage/main.png"
          width={600}
          height={600}
          className="hidden lg:absolute lg:block -top-[70px] -right-[400px]"
        />
      </div>
    </div>
  );
};
