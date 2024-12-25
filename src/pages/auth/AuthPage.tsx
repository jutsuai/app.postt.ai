import React from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Image from "@/components/Image";
import useBreakpoint from "@/lib/useBreakpoint";

export default function AuthPage() {
  const { sm } = useBreakpoint();
  return (
    <>
      {sm && (
        <>
          <Image
            src="/onboarding/bg-accent-1.svg"
            alt=""
            className="w-full absolute top-8"
          />
          <Image
            src="/postt-logo.svg"
            alt=""
            className="w-40 mx-auto absolute  left-8 top-1/4"
          />
          <Image
            src="/onboarding/auth-model.png"
            alt=""
            className="absolute -right-12 bottom-20 z-10 drop-shadow-[20px_0px_20px_rgba(0,0,0,0.15)]"
          />
          <Image
            src="/onboarding/bg-accent-2.svg"
            alt=""
            className="w-full absolute bottom-56"
          />
        </>
      )}
      <div className="z-10 grid place-items-center absolute sm:relative  left-0 right-0 bottom-0 bg-foreground sm:bg-transparent  bg-gradient-to-b sm:from-transparent sm:to-transparent from-foreground/50 via-transparent to-foreground/50">
        <div className="bg-gradient-to-b right-0 left-0 h-8 sm:hidden absolute sm:relative -top-8 to-foreground via-black/80 from-transparent " />
        <div className="sm:bg-foreground max-w-md py-6 sm:p-6 sm:rounded-xl text-center">
          <h1 className="text-white text-xl font-medium">
            Automate content creation
          </h1>
          <p className="text-white/70 text-xs px-8 mt-2 mb-10 ">
            Create and schedule your content with ease and grow your audience
            with our powerful tools
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
    </>
  );
}
