import { AuthPage } from "@/components/module/auth";
import { FormLogin } from "@/components/module/auth/login";

const Page = () => {
  return (
    <div className="lg:flex">
      <AuthPage />
      <FormLogin />
    </div>
  );
};

export default Page;
