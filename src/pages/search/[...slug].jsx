import { Input } from "@/components/base/input";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../configs/api";
import { Card } from "@/components/module/card";
import { Skeleton } from "@/components/module/skeleton";
import { NAVLINK } from "@/components/module/navbar";
import { Footer } from "@/components/module/footer";
import { Filter } from "@/components/module/filter";
import { Pagination } from "@/components/module/pagination";

export default function Page({ initialData, searchTerm }) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const router = useRouter();

  const getSearch = async () => {
    setLoading(true);
    try {
      const params = {
        page: router.query.page || 1,
        limit: 12,
        sort: router.query.sort || "created_at",
        sortBy: router.query.sortBy || "desc",
      };

      if (searchTerm && searchTerm !== "recipes") {
        params.search = searchTerm;
      }
      const response = await api.get(`recipes`, { params });
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (router.isReady) {
      getSearch();
    }
  }, [
    router.query.slug,
    router.query.page,
    router.query.sort,
    router.query.sortBy,
  ]);

  const handleSearch = () => {
    if (search !== "") {
      return router.push({
        pathname: `/search/${search}`,
        query: {
          page: 1,
          sort: router.query.sort,
          sortBy: router.query.sortBy,
        },
      });
    }
    router.push({
      pathname: `/search/recipes`,
      query: { page: 1, sort: router.query.sort, sortBy: router.query.sortBy },
    });
  };

  const handlePageChange = (newPage) => {
    router.push({
      pathname: `/search/${searchTerm ? searchTerm : "recipes"}`,
      query: {
        page: newPage,
        sort: router.query.sort,
        sortBy: router.query.sortBy,
      },
    });
  };

  const handleSort = (sort, sortBy) => {
    router.push({
      pathname: `/search/${searchTerm ? searchTerm : "recipes"}`,
      query: { page: router?.query?.page, sort, sortBy },
    });
    handleOpen();
  };

  return (
    <main>
      <div className="w-full flex flex-col lg:flex-row justify-around lg:items-center py-5 lg:px-10 bg-main-yellow/70">
        <div className="w-full lg:w-[400px]">
          <NAVLINK />
        </div>
        <div className="relative w-[330px] px-5 lg:px-0 lg:w-1/2">
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
        <Filter handleOpen={handleOpen} handleSort={handleSort} open={open} />
      </div>
      <div className="grid grid-cols-1 gap-y-4 px-5 lg:grid-cols-3 2xl:grid-cols-4 lg:gap-y-1 lg:gap-x-3 2xl:gap-4 lg:px-[3%] bg-main-white py-5 lg:min-h-screen">
        {data?.length >= 1 ? (
          !loading ? (
            data?.map((item) => (
              <Card
                href={`/recipe/${item?.id}`}
                image={item?.image}
                title={item?.title}
                key={item?.id}
                style={
                  "absolute bottom-5 text-2xl left-5 font-semibold w-[150px] text-[#fff] lg:bottom-40 lg:text-xl 2xl:bottom-5 2xl:left-3 lg:left-10"
                }
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
      <Pagination
        data={data}
        handlePageChange={handlePageChange}
        router={router}
      />
      <Footer />
    </main>
  );
}

export async function getStaticPaths() {
  const paths = [{ params: { slug: ["recipes"], page: "1" } }];

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const { slug, page = 1 } = params;
  const searchTerm = slug && slug.length > 0 ? slug.join(" ") : "";
  const sort = params.sort || "created_at";
  const sortBy = params.sortBy || "desc";

  const paramsForAPI = {
    page: page,
    limit: 10,
    sort,
    sortBy,
  };

  if (searchTerm && searchTerm !== "recipes") {
    paramsForAPI.search = searchTerm;
  }

  let initialData = [];
  try {
    const response = await api.get(`recipes`, { params: paramsForAPI });
    initialData = response?.data?.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      initialData,
      searchTerm,
      page: parseInt(page),
      sort,
      sortBy,
    },
    revalidate: 10,
  };
}
