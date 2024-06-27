import { Footer } from "@/components/module/footer";
import { HamburgerMenu } from "@/components/module/hamburger";
import { NAVLINK } from "@/components/module/navbar";
import { AddRecipe } from "@/components/module/recipe/add";
import Image from "next/image";

export default function Page() {
  return (
    <main>
      <div className="hidden lg:block">
        <NAVLINK />
      </div>
      <div className="bg-main-yellow mb-4 h-16 w-full flex justify-between pl-10 lg:hidden">
        <Image src={"/auth/Group 697.svg"} width={30} height={30} alt="Logo" />
        <HamburgerMenu />
      </div>
      <AddRecipe />
      <Footer />
    </main>
  );
}
