import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Loader } from "@/components/base/loader";
import { register, validateRegister } from "@/utils/register";
import { auth, provider } from "@/services/firebase";
import { signInWithPopup } from "firebase/auth";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GoogleRegister } from "./GoogleRegister";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authRegister } from "@/redux/features/authSlice";

export const FormRegister = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const [socialRegister, setSocialRegister] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const popupGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      setSocialRegister({
        name: response?.user?.displayName,
        email: response?.user?.email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeRegisterGoogle = (e) => {
    setSocialRegister({
      ...socialRegister,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const handleRegister = async () => {
    try {
      const response = await dispatch(authRegister(socialRegister));
      if (response?.payload?.statuCode != 201) {
        return alert(response?.payload);
      }
      alert(response?.payload?.message);
      router.push("/login");
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };
  const field = [
    { label: "Name", name: "name", type: "text", placeholder: "Name" },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "example@gmail.com",
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "text",
      placeholder: "08xxxxx",
    },
    {
      label: "Create New Password",
      name: "password",
      type: "password",
      placeholder: "Create a new password",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
    },
  ];
  const [showPassword, setShowPassword] = useState({
    d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88",
    type: "password",
  });
  const handleShowPassword = () => {
    if (showPassword?.type === "password") {
      setShowPassword({
        d: "M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z",
        type: "text",
      });
    } else if (showPassword?.type === "text") {
      setShowPassword({
        d: "M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88",
        type: "password",
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validateRegister,
    onSubmit: async (values, { resetForm }) => {
      const data = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      };
      const response = await dispatch(authRegister(data));
      if (response?.payload?.statuCode != 201) {
        return alert(response?.payload);
      }
      alert(response?.payload?.message);
      resetForm();
      router.push("/login");
    },
  });
  return (
    <div className="flex flex-col justify-center w-full lg:w-3/5 items-center">
      <div
        className={`${
          socialRegister?.email != ""
            ? "text-center mt-48 lg:mt-0"
            : "text-center mt-6 lg:mt-0"
        }`}
      >
        <h1 className="lg:text-main-yellow font-bold text-2xl my-3">
          Let’s Get Started !
        </h1>
        <p className="lg:text-[#8692A6]">
          Create new account to access all features
        </p>
      </div>
      <div
        onClick={popupGoogle}
        className={`${
          socialRegister?.email === ""
            ? "cursor-pointer px-3 mt-5 py-2 flex justify-center items-center gap-3 lg:w-1/3 mx-auto border border-[#8692A6]"
            : "hidden"
        }`}
      >
        <Image src={"/auth/google.png"} width={20} height={20}  alt="image"/>
        <p className="text-[#000] lg:text-[#8692A6]">Sign in with Google</p>
      </div>
      {socialRegister?.name != "" && socialRegister?.email != "" ? (
        <GoogleRegister
          socialRegister={socialRegister}
          handleChangeRegisterGoogle={handleChangeRegisterGoogle}
          loading={loading}
          handleRegister={handleRegister}
        />
      ) : (
        <form
          className="flex flex-col justify-start w-full lg:w-1/2 px-5 my-5"
          onSubmit={formik.handleSubmit}
        >
          {field?.map((item, i) =>
            item?.name === "password" ? (
              <div key={i} className="relative flex flex-col">
                <label
                  htmlFor="password"
                  className="text-[#000] lg:text-[#8692A6]"
                >
                  Create New Password
                </label>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik?.values?.password}
                  name="password"
                  type={showPassword?.type}
                  placeholder="Create New Password"
                  className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  onClick={handleShowPassword}
                  stroke="currentColor"
                  className="size-6 absolute right-5 top-1/2 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={showPassword?.d}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                {formik.touched.password && formik.errors.password && (
                  <div className="text-[#f82d2d] text-[12px]">
                    {formik.errors.password}
                  </div>
                )}
              </div>
            ) : (
              <div key={i} className="relative flex flex-col">
                <label
                  htmlFor={item?.name}
                  className="text-[#000] lg:text-[#8692A6]"
                >
                  {item?.label}
                </label>
                <Input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik?.values[item?.name]}
                  name={item?.name}
                  type={item?.type}
                  placeholder={item?.placeholder}
                  className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
                />
                {formik.touched[item?.name] && formik.errors[item?.name] && (
                  <div className="text-[#f82d2d] text-[12px]">
                    {formik.errors[item?.name]}
                  </div>
                )}
              </div>
            )
          )}
          <label className="inline-flex gap-2 items-center my-4">
            <Input type="checkbox" className="w-4 h-4" />
            <span>I agree to terms & conditions</span>
          </label>
          <div className="my-5">
            <Button
              disabled={loading}
              type="submit"
              className="bg-main-yellow/90 w-full py-3 text-[#fff] font-semibold rounded hover:bg-main-yellow"
              title={loading === false ? "Register" : <Loader />}
            />
            <span className="inline-block text-center w-full lg:text-[#8692A6] text-sm my-3">
              Already have account?{" "}
              <Link
                className="text-main-blue lg:text-main-yellow cursor-pointer hover:underline"
                href={"/login"}
              >
                Log in Here
              </Link>
            </span>
          </div>
        </form>
      )}
    </div>
  );
};
