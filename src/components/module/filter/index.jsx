import { Menu } from "../navbar";

export const Filter = ({ open, handleOpen, handleSort }) => {
  return (
    <div className="absolute top-[90px] lg:top-0 right-5 lg:relative lg:right-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#fff"
        onClick={handleOpen}
        className="lg:size-6 size-10 cursor-pointer"
      >
        <path
          fillRule="evenodd"
          d="M3.792 2.938A49.069 49.069 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836Z"
          clipRule="evenodd"
        />
      </svg>
      <div className={`${open ? "absolute z-10 right-0 lg:-right-20 top-10 lg:top-8" : "hidden"}`}>
        <Menu>
          <button
            className="text-[#6666] font-bold border-b border-[#9c9b9b] px-5 text-start py-3 hover:text-main-blue"
            onClick={() => handleSort("title", "asc")}
          >
            Sort by name
          </button>
          <button
            className="text-[#6666] font-bold px-5 text-start hover:text-main-blue"
            onClick={() => handleSort("created_at", "desc")}
          >
            Sort by newest
          </button>
        </Menu>
      </div>
    </div>
  );
};
