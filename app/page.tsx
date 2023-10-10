import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="mx-auto min-h-screen w-full">
      <MainNav />
      <div className="mx-auto flex h-[calc(100vh-57px)] w-full max-w-6xl items-center px-4 pt-0 sm:px-8">
        <div className="flex h-[80%] w-full gap-4">
          <div className="flex h-full w-[300px] shrink-0 flex-col gap-2">
            <Button className="gap-2">
              <PlusCircleIcon className="h-5 w-5" />
              Add a Link Set
            </Button>
            <Button variant="outline">(or prefill 5 demo link sets)</Button>
          </div>
          <div className="flex h-full w-full flex-1 rounded-md border"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
