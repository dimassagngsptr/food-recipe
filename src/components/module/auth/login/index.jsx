import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import Link from "next/link";

export const FormLogin = () => {
  return (
    <div className="flex flex-col justify-center w-3/5 items-center">
      <div className="text-center">
        <h1 className="text-main-yellow font-bold text-2xl my-5">Welcome</h1>
        <p className="text-[#8692A6]">Log in into your exiting account</p>
      </div>
      <form className="flex flex-col justify-start w-1/2 px-5 my-10">
        <label htmlFor="email" className="text-[#8692A6]">
          Email
        </label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label htmlFor="password" className="text-[#8692A6]">
          Password
        </label>
        <Input
          type="password"
          placeholder="example@gmail.com"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label className="inline-flex gap-2 items-center my-4">
          <Input type="checkbox" className="w-4 h-4" />
          <span>I agree to terms & conditions</span>
        </label>
        <div className="my-5">
          <Button
            className="bg-main-yellow/90 w-full py-3 text-[#fff] font-semibold rounded hover:bg-main-yellow"
            title={"Log in"}
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
