// "use client";
import Button from "@/components/base/button";
import Link from "next/link";

export const NAVLINK = () => {
  const navLink = [
    { title: "Home", link: "#" },
    { title: "Add Recipe", link: "#" },
    { title: "Profile", link: "#" },
  ];
  return (
    <main className="flex gap-14 text-main-blue font-semibold px-[10%] py-[4%]">
      {navLink?.map(({ title, link }) => (
        <Link key={link} className="hover:underline" href={link}>
          {title}
        </Link>
      ))}
    </main>
  );
};

export const NAVAUTH = () => {
  return (
    <main className="px-[10%] py-[4%]">
      <div className="flex gap-4 justify-center">
        <Link href={"/login"}>
          <Button
            title={"Login"}
            className={
              "bg-main-blue rounded text-[#fff] font-semibold px-5 py-2"
            }
          />
        </Link>
        <Link href={"/register"}>
          <Button
            title={"Register"}
            className={
              "bg-main-white/70 rounded text-main-blue border border-main-blue font-semibold px-5 py-2"
            }
          />
        </Link>
      </div>
    </main>
  );
};
