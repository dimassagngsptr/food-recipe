import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import Link from "next/link";

export const FormRegister = () => {
  return (
    <div className="flex flex-col justify-center w-3/5 items-center">
      <div className="text-center">
        <h1 className="text-main-yellow font-bold text-2xl my-3">
          Let’s Get Started !
        </h1>
        <p className="text-[#8692A6]">
          Create new account to access all features
        </p>
      </div>
      <form className="flex flex-col justify-start w-1/2 px-5 my-5">
        <label htmlFor="name" className="text-[#8692A6]">
          Name
        </label>
        <Input
          type="text"
          placeholder="Name"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label htmlFor="email" className="text-[#8692A6]">
          Email Address
        </label>
        <Input
          type="email"
          placeholder="example@gmail.com"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label htmlFor="phone" className="text-[#8692A6]">
          Phone Number
        </label>
        <Input
          type="text"
          placeholder="08xxxxxx"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label htmlFor="password" className="text-[#8692A6]">
          Create New Password
        </label>
        <Input
          type="password"
          placeholder="Create New Password"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label htmlFor="confirmPassword" className="text-[#8692A6]">
          Confirm Password
        </label>
        <Input
          type="password"
          placeholder="Confirm Password"
          className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
        />
        <label className="inline-flex gap-2 items-center my-4">
          <Input type="checkbox" className="w-4 h-4" />
          <span>I agree to terms & conditions</span>
        </label>
        <div className="my-5">
          <Button
            className="bg-main-yellow/90 w-full py-3 text-[#fff] font-semibold rounded hover:bg-main-yellow"
            title={"Register"}
          />
          <span className="inline-block text-center w-full text-[#8692A6] text-sm my-3">
            Already have account?{" "}
            <Link className="text-main-yellow cursor-pointer hover:underline" href={"/login"}>
              Log in Here
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};
