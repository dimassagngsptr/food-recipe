import { Card } from "@/components/module/card";
import { NAVAUTH, NAVLINK } from "@/components/module/navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { api } from "../../configs/api";
import { Skeleton } from "@/components/module/skeleton";
import { getCookie } from "@/utils/cookie";
import { useSelector } from "react-redux";
import { Footer } from "@/components/module/footer";
import { HamburgerMenu } from "@/components/module/hamburger";

export default function Page() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [currentRoute, setCurrentRoute] = useState({
    selected: "My Recipe",
    route: "recipes/self",
  });
  const [data, setData] = useState([]);
  const { token } = getCookie();
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
    console.log(id);
    try {
      const response = await api.delete(`recipes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleClik(currentRoute?.route, currentRoute?.selected);
      alert(response?.data?.message);
    } catch (error) {
      alert("Your recipe has been liked or saved by someone");
    }
  };

  const table = [
    { title: "My Recipe", route: "recipes/self" },
    { title: "Saved Recipe", route: "recipes/save" },
    { title: "Like Recipe", route: "recipes/like" },
  ];
  useEffect(() => {
    // setData(user?.myRecepi?.data);
    handleClik("recipes/self", "My Recipe");
  }, []);
  return (
    <main>
      <div className="hidden lg:flex lg:justify-between lg:items-center">
        <NAVLINK />
        <NAVAUTH />
      </div>
      <div className="bg-main-yellow mb-4 h-16 w-full flex justify-between pl-10 lg:hidden">
        <Image src={"/auth/Group 697.svg"} width={30} height={30} alt="Logo" />
        <HamburgerMenu />
      </div>
      <div className="relative flex flex-col items-center justify-center w-full h-[300px] lg:h-[300px]">
        <Image
          src={"/profile/user.png"}
          width={150}
          height={150}
          className="mx-auto"
          alt="image"
        />
        <h1 className="text-2xl font-semibold my-5">
          {user?.data?.data?.name}
        </h1>
      </div>
      <div className="flex gap-8 px-[10%] text-2xl lg:mt-20">
        {table?.map((items, i) => (
          <button
            key={i}
            onClick={() => handleClik(items?.route, items?.title)}
            className={`${
              items?.title === currentRoute?.selected
                ? "font-semibold"
                : "font-normal text-[#666666]"
            } text-[16px] lg:text-xl`}
          >
            {items?.title}
          </button>
        ))}
      </div>
      {loading ? (
        <div className="border-t border-[#0007] flex flex-wrap gap-x-10 px-[10%] py-[3%] mt-8 lg:gap-5 lg:min-h-[800px]">
          {Array.from(new Array(5)).map((item) => (
            <Skeleton key={item} />
          ))}
        </div>
      ) : (
        <div className="border-t border-[#0007] flex flex-wrap gap-5 px-3 lg:gap-10 lg:px-[10%] py-[3%] my-8 lg:min-h-[800px]">
          {data && data?.length <= 0 ? (
            <div className="flex flex-col md:justify-center md:w-full lg:justify-center items-center lg:w-full lg:h-full">
              <h1 className="lg:text-xl">Opss you dont have item now</h1>
              <Image
                src={"/profile/empty.jpg"}
                width={400}
                height={400}
                alt="image"
              />
            </div>
          ) : (
            data?.map((items) => (
              <div className="relative" key={items?.id}>
                <button
                  onClick={() => handleDelete(items?.id)}
                  className={`${
                    currentRoute?.selected === "My Recipe"
                      ? "bg-[#7C0A02] w-[30px] h-[30px] rounded-full flex items-center justify-center z-10 absolute top-5 right-3 hover:-translate-y-1 transition duration-300"
                      : "hidden"
                  }`}
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
                {items?.image == "" ? (
                  <Card
                    image={"/landingpage/burger.png"}
                    title={items?.title}
                    href={`/recipe/${items?.recipe?.id}`}
                  />
                ) : items?.recipe?.image ? (
                  currentRoute?.selected === "My Recipe" ? (
                    <Card
                      image={items?.recipe?.image}
                      title={items?.recipe?.title}
                      style={
                        "absolute bottom-5 text-2xl left-5 font-semibold w-[150px] text-[#fff] lg:bottom-10 lg:text-xl 2xl:bottom-5 2xl:left-3 lg:left-10"
                      }
                      href={`/recipe/update/${items?.id}`}
                    />
                  ) : (
                    <Card
                      image={items?.recipe?.image}
                      title={items?.recipe?.title}
                      style={
                        "absolute bottom-5 text-2xl left-5 font-semibold w-[150px] text-[#fff] lg:bottom-10 lg:text-xl 2xl:bottom-5 2xl:left-3 lg:left-10"
                      }
                      href={`/recipe/${items?.recipe?.id}`}
                    />
                  )
                ) : currentRoute?.selected === "My Recipe" ? (
                  <Card
                    image={items?.image}
                    title={items?.title}
                    style={
                      "absolute bottom-5 text-2xl left-5 font-semibold w-[150px] text-[#fff] lg:bottom-10 lg:text-xl 2xl:bottom-5 2xl:left-3 lg:left-10"
                    }
                    href={`/recipe/update/${items?.id}`}
                  />
                ) : (
                  <Card
                    image={items?.image}
                    title={items?.title}
                    style={
                      "absolute bottom-5 text-2xl left-5 font-semibold w-[150px] text-[#fff] lg:bottom-10 lg:text-xl 2xl:bottom-5 2xl:left-3 lg:left-10"
                    }
                    href={`/recipe/${items?.recipe?.id}`}
                  />
                )}
              </div>
            ))
          )}
        </div>
      )}
      <Footer />
    </main>
  );
}
