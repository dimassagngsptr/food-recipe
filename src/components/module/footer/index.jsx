import Link from "next/link";

export const Footer = () => {
  const items = [
    {
      title: "Product",
      link: "#",
    },
    {
      title: "Company",
      link: "#",
    },
    {
      title: "Learn More",
      link: "#",
    },
    {
      title: "Get In Touch",
      link: "#",
    },
  ];
  return (
    <div className="h-[385px] w-full bg-main-yellow flex flex-col items-center justify-center">
      <div className="flex flex-col justify-between h-[90%] pt-[5%] ">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-main-blue text-6xl">Eat, Cook, Repeat</h1>
          <p className="text-[#707070] text-xl">
            Share your best recipe by uploading here !
          </p>
        </div>
        <div className="flex justify-center gap-10">
          {items?.map(({ title, link }, idx) => (
            <Link href={link} key={idx} className="text-[#707070]">
              {title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
