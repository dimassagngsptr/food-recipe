import { Card } from "@/components/module/card";
import { NAVLINK } from "@/components/module/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Skeleton } from "@/components/module/skeleton";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    selected: "My Recipe",
    route: "",
  });

  const [data, setData] = useState([]);
  const token = useLocalStorage("token");
  const handleClik = async (route, selected) => {
    setCurrentRoute({ selected: selected, route: route });
    if (route === "") {
      setData(null);
      return;
    }
    setLoading(true);
    try {
      const response = await api.get(route, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`${currentRoute?.route}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleClik(currentRoute?.route, currentRoute?.selected);
      alert(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  const table = [
    { title: "My Recipe", route: "" },
    { title: "Saved Recipe", route: "/v1/recipes/save" },
    { title: "Like Recipe", route: "/v1/recipes/like" },
  ];

  return (
    <main>
      <NAVLINK />
      <div className="w-full my-20">
        <Image
          src={"/profile/Ellipse 127.png"}
          width={172}
          height={172}
          className="mx-auto"
        />
        <Image
          src={"/profile/edit-3.svg"}
          width={30}
          height={30}
          className="absolute top-[48%] right-[43%] transform -translate-x-1/2 -translate-y-1/2 "
        />
        <h1 className="absolute top-[55%] right-[40%] -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold my-5">
          Garneta Sharina
        </h1>
      </div>
      <div className="flex gap-5 px-[10%] text-2xl mt-40">
        {/* <button className="font-semibold">My Recipe</button> */}
        {table?.map((items, i) => (
          <button
            onClick={() => handleClik(items?.route, items?.title)}
            className={`${
              items?.title === currentRoute?.selected
                ? "font-semibold"
                : "font-normal text-[#666666]"
            }`}
          >
            {items?.title}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="border-t border-[#0007] flex gap-x-10 px-[10%] py-[3%] mt-2">
          {Array.from(new Array(5)).map((item) => (
            <Skeleton />
          ))}
        </div>
      ) : (
        <div className="border-t border-[#0007] flex gap-x-10 px-[10%] py-[3%] mt-2 min-h-[500px]">
          {data == null ? (
            <h1 className="text-[#000] text-2xl">Empty item</h1>
          ) : (
            data?.map((items) => (
              <div className="relative">
                <button
                  onClick={() => handleDelete(items?.id)}
                  className="bg-[#7C0A02] w-[30px] h-[30px] rounded-full flex items-center justify-center z-10 absolute top-5 right-3 hover:-translate-y-1 transition duration-300"
                >
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
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
                <Card
                  image={items?.recipe?.image}
                  title={items?.recipe?.title}
                  id={items?.recipe?.id}
                />
              </div>
            ))
          )}
        </div>
      )}
    </main>
  );
}
