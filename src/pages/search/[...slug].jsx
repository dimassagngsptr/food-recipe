import { Input } from "@/components/base/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Card } from "@/components/module/card";
import { Skeleton } from "@/components/module/skeleton";
import { NAVLINK } from "@/components/module/navbar";
import { Footer } from "@/components/module/footer";

export default function Page() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();
  const { slug, page = 1 } = router.query;

  const searchTerm = slug && slug.length > 0 ? slug.join(" ") : "";
  const getSearch = async () => {
    setLoading(true);
    try {
      const params = {
        page: page,
        limit: 12,
      };

      if (searchTerm != "recipes") {
        params.search = searchTerm;
      }
      const response = await api.get(`/v1/recipes`, { params });
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (search != "") {
      return router.push({
        pathname: `/search/${search}`,
        query: { page: 1 },
      });
    }
    router.push({
      pathname: `/search/recipes`,
      query: { page: 1 },
    });
  };

  const handlePageChange = (newPage) => {
    router.push({
      pathname: `/search/${slug ? slug?.join("/") : "recipes"}`,
      query: { page: newPage },
    });
  };

  useEffect(() => {
    getSearch();
  }, [slug, page]);

  return (
    <main>
      <div className="w-full flex flex-col lg:flex-row justify-around py-5 lg:px-10 bg-main-yellow/70">
        <div className="w-full lg:w-[400px]">
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
            onClick={handleSearch}
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
      <div className="grid grid-cols-1 gap-y-4 px-5  lg:grid-cols-4 lg:gap-8 lg:px-[3%] bg-main-white py-5">
        {data?.length >= 1 ? (
          !loading ? (
            data?.map((item) => (
              <Card
                href={`/recipe/${item?.id}`}
                image={item?.image}
                title={item?.title}
                key={item?.id}
              />
            ))
          ) : (
            Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Skeleton />
              </div>
            ))
          )
        ) : (
          <div className="w-screen h-screen container flex justify-center items-center">
            {searchTerm ? (
              <h1>{searchTerm} Not found</h1>
            ) : (
              <h1>All Recipes</h1>
            )}
          </div>
        )}
      </div>
      <div className="flex px-5 lg:px-0 flex-wrap gap-2 justify-center pb-10 pt-3 bg-main-white">
        <button
          disabled={page <= 1}
          onClick={() => handlePageChange(parseInt(page) - 1)}
          className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
        >
          {"<"}
        </button>
        {Array.from(new Array(7)).map((item, idx) => (
          <button
            key={item}
            onClick={() => handlePageChange(idx + 1)}
            className={`${
              page == idx + 1 ? "bg-main-blue" : "bg-main-yellow"
            } w-10 h-10 rounded flex items-center justify-center text-main-white`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          disabled={data?.length < 8}
          onClick={() => handlePageChange(parseInt(page) + 1)}
          className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
        >
          {">"}
        </button>
      </div>
      <Footer />
    </main>
  );
}
