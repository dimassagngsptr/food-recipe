import Button from "@/components/base/button";

export const Pagination = ({ handlePageChange, router, data }) => {
  return (
    <div className="flex px-5 lg:px-0 flex-wrap gap-2 justify-center pb-10 pt-3 bg-main-white">
      <Button
        title={"<"}
        disabled={router?.query?.page <= 1}
        onClick={() => handlePageChange(parseInt(router?.query?.page) - 1)}
        className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
      />
      {Array.from(new Array(7)).map((_, idx) => (
        <Button
          title={idx + 1}
          key={idx}
          onClick={() => handlePageChange(idx + 1)}
          className={`${
            router?.query?.page == idx + 1 ? "bg-main-blue" : "bg-main-yellow"
          } w-10 h-10 rounded flex items-center justify-center text-main-white`}
        />
      ))}
      <Button
        title={">"}
        disabled={data?.length < 8}
        onClick={() => handlePageChange(parseInt(router?.query?.page) + 1)}
        className="bg-main-yellow w-10 h-10 rounded flex items-center justify-center text-main-white"
      />
    </div>
  );
};
