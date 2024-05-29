import { AuthPage } from "@/components/module/auth";
import { FormLogin } from "@/components/module/auth/login";

const Login = () => {
  return (
    <div className="flex">
      <AuthPage />
      <FormLogin />
    </div>
  );
};

export default Login;
