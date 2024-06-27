import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Loader } from "@/components/base/loader";
import { api } from "@/configs/api";
import { getCookie } from "@/utils/cookie";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
export const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({
    selectedImage: null,
    file: null,
    url: "",
  });
  const { token } = getCookie();
  const handleChangeImage = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        setFile({
          selectedImage: event.target.result,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmitImage = async () => {
    if (file?.file != null) {
      try {
        let formData = new FormData();
        formData.append("file", file?.file);
        const response = await api.post("upload", formData);
        if (response?.status == 201) {
          setFile({ ...file, url: response?.data?.data?.file_url });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    handleSubmitImage();
  }, [file?.file]);
  useEffect(() => {
    if (file.url) {
      formik.setFieldValue("image", file.url);
    }
  }, [file?.url]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: file.url,
    },
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        const response = await api.post("recipes/", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(response?.data?.message);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      action.resetForm();
    },
  });
  return (
    <form
      className="flex flex-col w-full gap-8 lg:items-center justify-center px-5 lg:px-0 pb-36"
      onSubmit={formik.handleSubmit}
    >
      <div
        className="relative bg-[#F6F5F4] w-full  lg:w-1/2 h-[300px] lg:h-[500px] rounded"
        style={{
          backgroundImage: `url(${file?.selectedImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Input
          type="file"
          className="w-full h-full opacity-0"
          onChange={handleChangeImage}
        />
        {!file?.selectedImage && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#666666"
            className="size-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        )}
        {!file?.selectedImage && (
          <small className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-10 text-[#666666] text-2xl">
            Add Photo
          </small>
        )}
      </div>
      <div className="lg:w-1/2 h-[80px]">
        <Input
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          type="text"
          placeholder="Tittle"
          className="w-full h-full bg-[#F6F5F4] px-6 rounded placeholder-[#000] outline-none"
        />
      </div>
      <div className="lg:w-1/2 h-[300px]">
        <textarea
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values?.description}
          name="description"
          className="bg-[#F6F5F4] w-full h-full py-3 px-5 placeholder-[#000] outline-none rounded"
          placeholder="Ingredients"
        ></textarea>
      </div>
      <Button
        type="submit"
        title={loading ? <Loader /> : "Submit"}
        className="bg-main-yellow w-1/4 py-3 text-[#fff] font-bold rounded-md text-lg mt-3"
      />
    </form>
  );
};
