import { Input } from "@/components/base/input";
import { NAVLINK } from "@/components/module/navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [search, setSearch] = useState();
  const router = useRouter();
  return (
    <main>
      <div className="w-full flex flex-col lg:flex-row justify-around py-5 lg:px-10 bg-main-yellow/70">
        <div className="w-[400px]">
          <NAVLINK />
        </div>
        <div className="relative w-full px-5 lg:px-0 lg:w-1/2">
          <Input
            className="bg-[#fff] px-16 py-5 outline-none rounded-md w-full border border-[#6666]"
            placeholder="Search Recipe"
            name="search"
            value={search}
            onChange={(e) => setSearch(e?.target?.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#C4C4C4"
            onClick={() => router.push(`/search/${search}`)}
            className="w-6 absolute top-5 left-10 lg:left-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>
    </main>
  );
}
