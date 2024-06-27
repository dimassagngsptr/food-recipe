"use client";
import Button from "@/components/base/button";
import { deleteCookie, getCookie } from "@/utils/cookie";
import Image from "next/image";
import Link from "next/link";
import { Children, useState } from "react";

export const NAVLINK = () => {
  const navLink = [
    { title: "Home", link: "/" },
    { title: "Add Recipe", link: "/recipe/add" },
    // { title: "Profile", link: "/profile" },
  ];
  return (
    <main className="flex gap-14 text-main-blue font-semibold px-[10%] py-[4%]">
      {navLink?.map(({ title, link }) => (
        <Link key={link} className="hover:underline outline-none" href={link}>
          {title}
        </Link>
      ))}
    </main>
  );
};

export const Menu = ({ children }) => {
  return (
    <main className="bg-[#fff] h-24 w-40 rounded border-2 border-[#b8b8b8] shadow-xl">
      <div className="relative flex flex-col gap-2">{children}</div>
    </main>
  );
};

export const NAVAUTH = ({ py }) => {
  const { token } = getCookie();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const handleLogout = () => {
    deleteCookie();
    window.location.reload();
  };
  return (
    <main className={`${token && `px-[10%] ${py}`} px-[10%] ${py}`}>
      <div className="flex gap-4 justify-center">
        {token ? (
          <div className="relative">
            <Image
              onClick={handleOpen}
              src={"/landingpage/User icon.svg"}
              width={50}
              height={50}
              alt="user"
              className="cursor-pointer"
            />
            <div className={`${open ? "absolute left-2" : "hidden"}`}>
              <Menu>
                <Link
                  href={"/profile"}
                  className="text-main-blue font-bold border-b border-[#9c9b9b] px-5 text-start py-3"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-main-blue font-bold px-5 text-start"
                >
                  Logout
                </button>
              </Menu>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </main>
  );
};
