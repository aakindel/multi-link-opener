import { MainNav } from "@/components/main-nav";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto min-h-[calc(100vh-57px)] w-full max-w-[1400px] px-4 pt-4 sm:px-8">
        <p className="font-medium">Default template removed.</p>
      </div>
    </div>
  );
};

export default Home;
