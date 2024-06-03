import { Input } from "@/components/base/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Card } from "@/components/module/card";
import { Skeleton } from "@/components/module/skeleton";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";

export default function Page() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const { slug } = router.query;
  const searchTerm = slug && slug.length > 0 ? slug.join(" ") : " ";
  const getSearch = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/v1/recipes`, {
        params: {
          search: searchTerm,
        },
      });
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleSearch = () => {
    router.push(`/search/${search}`);
  };
  useEffect(() => {
    getSearch();
  }, [slug]);

  return (
    <div>
      <div className="w-full flex justify-around py-5 px-10 bg-main-yellow/70">
        <div className="w-[400px]">
          <NAVLINK />
        </div>
        <div className="relative w-1/2">
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
            onClick={handleSearch}
            className="w-6 absolute top-5 left-5 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {/* <NAVAUTH /> */}
      </div>
      <div className="grid grid-cols-4 gap-y-8 pl-[3%] bg-main-white py-5">
        {data?.length >= 1 ? (
          !loading ? (
            data?.map((item) => (
              <Card
                href={`/recipe/${item?.id}`}
                image={item?.image}
                title={item?.title}
              />
            ))
          ) : (
            Array.from(new Array(10)).map((i) => (
              <div key={i}>
                <Skeleton />
              </div>
            ))
          )
        ) : (
          <div className="w-screen h-screen container">
            <h1>{searchTerm} Not found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
