import Button from "@/components/base/button";
import { deleteCookie, getCookie } from "@/utils/cookie";
import Link from "next/link";
import { useState } from "react";
import { NAVAUTH } from "../navbar";

export const HamburgerMenu = () => {
  const handleLogout = () => {
    deleteCookie();
    window.location.reload();
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const { token } = getCookie();
  const navLink = [
    { title: "Home", link: "/" },
    { title: "Add Recipe", link: "/recipe/add" },
    { title: "Profile", link: "/profile" },
  ];
  return (
    <main>
      <Button
        onClick={handleOpen}
        title={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        }
        className={`${open ? "hidden" : "block"} absolute top-5 right-3`}
      />
      <div
        className={`${
          open
            ? "h-screen w-2/3 z-20 bg-main-white absolute top-0 right-0 px-5 flex flex-col gap-5"
            : " w-0 h-screen absolute top-0 right-0 overflow-hidden bg-main-white"
        } transition-all duration-200`}
      >
        <div className="flex justify-between items-center w-full py-3">
          <svg
            onClick={() => setOpen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
          <p>Menu</p>
        </div>
        <div className="flex flex-col gap-2 text-main-blue font-semibold px-3">
          {token ? (
            <>
              {navLink?.map(({ title, link }) => (
                <Link
                  key={link}
                  className="hover:underline outline-none"
                  href={link}
                >
                  {title}
                </Link>
              ))}
              <Button
                title={"Logout"}
                className="bg-main-yellow py-2 text-main-white rounded mt-4"
                onClick={handleLogout}
              />
            </>
          ) : (
            <NAVAUTH />
          )}
        </div>
      </div>
    </main>
  );
};
