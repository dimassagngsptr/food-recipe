import Image from "next/image";
import Link from "next/link";

export const Card = ({ title, image, id }) => {
  return (
    <>
      <Link
        href={`/recipe/${id}`}
        className="relative rounded-md cursor-pointer hover:-translate-y-2 transition duration-300"
      >
        <Image
          src={image?.length < 5 ? "/landingpage/Rectangle 314.png" : image}
          quality={100}
          width={400}
          height={400}
          className="w-[400px] h-[400px] rounded-md object-cover opacity-90"
        />
        <h1 className="absolute bottom-5 text-2xl left-5 font-semibold w-[150px]">
          {title}
        </h1>
      </Link>
    </>
  );
};
