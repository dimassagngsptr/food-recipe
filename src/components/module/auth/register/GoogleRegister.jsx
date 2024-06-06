import Button from "@/components/base/button";
import { Input } from "@/components/base/input";
import { Loader } from "@/components/base/loader";

export const GoogleRegister = ({
  socialRegister,
  handleChangeRegisterGoogle,
  loading,
  handleRegister,
}) => {
  return (
    <div className="w-full px-5 lg:px-0 lg:w-1/2 flex flex-col">
      <Input
        onChange={(e) => handleChangeRegisterGoogle(e)}
        name="name"
        value={socialRegister?.name}
        className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
      />
      <Input
        disabled
        name="email"
        value={socialRegister?.email}
        className="bg-[#8692a66b] cursor-not-allowed border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
      />
      <Input
        onChange={(e) => handleChangeRegisterGoogle(e)}
        name="phone"
        placeholder="08xxxxx"
        className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
      />
      <Input
        onChange={(e) => handleChangeRegisterGoogle(e)}
        name="password"
        type="password"
        placeholder="Create New Password"
        className="border border-[#8692A6] py-3 px-5 rounded outline-1 outline-main-yellow my-2 focus:shadow-lg"
      />
      <Button
        disabled={loading}
        onClick={handleRegister}
        className="bg-main-yellow/90 w-full py-3 text-[#fff] font-semibold rounded hover:bg-main-yellow"
        title={loading === false ? "Register" : <Loader />}
      />
    </div>
  );
};
