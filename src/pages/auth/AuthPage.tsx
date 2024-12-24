import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function AuthPage() {
  return (
    <div className="z-10 grid place-items-center absolute sm:inset-0 left-0 right-0 bottom-0 bg-foreground sm:bg-transparent sm:bg-gradient-to-b from-foreground/50 via-transparent to-foreground/50">
      <div className="bg-gradient-to-b right-0 left-0 h-8 sm:hidden absolute sm:relative -top-8 to-foreground via-black/80 from-transparent " />
      <div className="sm:bg-foreground max-w-md py-6 sm:p-6 sm:rounded-xl text-center">
        <h1 className="text-white text-xl font-medium">
          Automate content creation
        </h1>
        <p className="text-white/70 text-xs px-8 mt-2 mb-10 ">
          Create and schedule your content with ease and grow your audience with
          our powerful tools
        </p>

        <div className="grid grid-cols-2 max-w-xs mx-auto gap-2 px-4 items-center">
          <Link to="/auth/signin" className="w-full">
            <Button
              variant="outline"
              className="bg-foreground hover:bg-foreground border-muted-foreground h-10 w-full  text-white rounded-3xl"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup" className="w-full">
            <Button className="rounded-3xl w-full h-10 text-black">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
