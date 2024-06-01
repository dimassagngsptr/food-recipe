import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Loader } from "@/components/base/loader";
import { login } from "@/pages/api/login";
import { useFormik } from "formik";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";

export const FormLogin = () => {
  const router = useRouter();
  const field = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
    },

    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      const response = await login(values);
      if (response?.data?.statuCode == 201) {
        alert(response?.data?.message);
        localStorage.setItem("token", response?.data?.data?.token);
        localStorage.setItem(
          "refreshToken",
          response?.data?.data?.refreshToken
        );
      } else {
        alert(response?.response?.data?.message);
      }
      setLoading(false);
      resetForm();
      router.push("/");
    },
  });
  return (
    <div className="flex flex-col justify-center w-3/5 items-center">
      <div className="text-center">
        <h1 className="text-main-yellow font-bold text-2xl my-5">Welcome</h1>
        <p className="text-[#8692A6]">Log in into your exiting account</p>
      </div>
      <form
        className="justify-start w-1/2 px-5 my-10"
        onSubmit={formik.handleSubmit}
      >
        {field?.map((item, i) => (
          <div key={i} className="flex flex-col ">
            <label htmlFor={item?.label} className="text-[#8692A6]">
              {item?.label}
            </label>
            <Input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik?.values?.[item?.name]}
              type={item?.type}
              name={item?.name}
              placeholder={item?.placeholder}
              className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
            />
            {formik.touched[item?.name] && formik.errors[item?.name] && (
              <div className="text-[#f82d2d] text-[12px]">
                {formik.errors[item?.name]}
              </div>
            )}
          </div>
        ))}
        <label className="inline-flex gap-2 items-center my-4">
          <Input type="checkbox" className="w-4 h-4" />
          <span>I agree to terms & conditions</span>
        </label>
        <div className="my-5">
          <Button
            disabled={loading}
            type="submit"
            className="bg-main-yellow/90 w-full py-3 text-[#fff] font-semibold rounded hover:bg-main-yellow"
            title={loading === false ? "Log in" : <Loader />}
          />
          <span className="inline-block text-end w-full text-[#8692A6] text-sm my-3 cursor-pointer hover:underline">
            Forgot Password?
          </span>
          <span className="inline-block text-center w-full text-[#8692A6] text-sm my-3">
            Don’t have an account?{" "}
            <Link
              href={"/register"}
              className="text-main-yellow cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
