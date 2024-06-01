import { AuthPage } from "@/components/module/auth";
import { FormRegister } from "@/components/module/auth/register";

const Page = () => {
  return (
    <div className="flex">
      <AuthPage />
      <FormRegister />
    </div>
  );
};

export default Page;
