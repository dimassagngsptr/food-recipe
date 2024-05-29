import Image from "next/image";

export const Card = ({ items }) => {
 

  return (
    <>
      {items?.map((item, idx) => (
        <div
          className="relative rounded-md cursor-pointer"
          key={idx}
          onClick={() => alert(idx + 1)}
        >
          <Image src={item?.image} width={item?.width} height={item?.height} />
          <h1 className="absolute bottom-5 text-2xl left-5 font-semibold">
            {item?.title[0]} <br />
            {item?.title[1]}
          </h1>
        </div>
      ))}
    </>
  );
};
