import Image from "next/image";
import Link from "next/link";

export const Card = ({ title, image, href, style }) => {
  return (
    <>
      <Link
        href={href}
        className="relative rounded-md cursor-pointer lg:hover:-translate-y-2 transition duration-300"
      >
        <Image
        alt="image"
          src={
            image === "" || image === null || image?.length < 5
              ? "/landingpage/Rectangle 314.png"
              : image
          }
          quality={100}
          width={400}
          height={400}
          className="w-[400px] h-[400px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] rounded-md object-cover opacity-90"
        />
        <h1 className={style}>
          {title}
        </h1>
      </Link>
    </>
  );
};
