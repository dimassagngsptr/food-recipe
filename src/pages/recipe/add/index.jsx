import { Footer } from "@/components/module/footer";
import { NAVLINK } from "@/components/module/navbar";
import { AddRecipe } from "@/components/module/recipe/add";

export default function Page() {
  return (
    <main>
      <NAVLINK />
      <AddRecipe />
      <Footer />
    </main>
  );
}
