import { Input } from "@/components/base/input";
import { useRouter } from "next/router";
import { useState } from "react";

export const SearchSection = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (search != "") {
      return router.push(`/search/${search}`);
    }
    router.push({
      pathname: `/search/recipes`,
      query: { page: 1 },
    });
  };

  return (
    <div className=" flex flex-col w-full items-center lg:w-[64%] gap-y-5">
      <h1 className="text-2xl lg:text-[72px] text-main-blue font-bold lg:leading-tight">
        Discover Recipe <br />& Delicious Food
      </h1>
      <div className="relative w-full px-5 lg:pr-10">
        <Input
          className="bg-[#fff] px-16 py-5 outline-none rounded-md w-full"
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
          onClick={handleSearch}
          className="w-6 absolute top-5 left-10 lg:left-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </div>
    </div>
  );
};
