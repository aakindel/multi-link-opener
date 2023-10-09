import { MainNav } from "@/components/main-nav";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <div className="flex h-[80%] w-full gap-4">
          <div className="flex h-full w-[350px] shrink-0 border"></div>
          <div className="flex h-full w-full flex-1 border"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
