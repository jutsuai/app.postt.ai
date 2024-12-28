import Image from "@/components/Image";
import { Button } from "@/components/ui/button";

export default function ChooseAudience({ navigate }: { navigate: any }) {
  const linkedInAudience = [
    "What is your audience?",
    "What is your industry?",
    "What is your value proposition?",
    "What tone and style do you prefer?",
  ];

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitted");
    navigate("/signup?onboarding=preview");
  };
  return (
    <div className="flex sm:min-w-96 pt-6 -mx-6 -mb-14 sm:-mb-10  px-6 pb-10 flex-col items-center gap-4 max-h-[90dvh] overflow-y-auto">
      <Image
        src="/onboarding/choose-audience.svg"
        alt=""
        className="size-[140px]"
      />
      <h3 className="text-xl text-center font-semibold">
        Hi Adnan, let's give you full experience
      </h3>
      <p className="text-muted-foreground text-sm -mt-2 text-center">
        answer to get a Linkedin Post
      </p>

      <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 mt-3">
        {linkedInAudience.map((data, index) => (
          <div
            key={index}
            className="focus-within:border-primary-foreground h-16 border  rounded-xl px-3 py-2 flex flex-col gap-1 w-full"
          >
            <p className="text-sm font-medium">{data}</p>
            <input
              placeholder="Type the answer here.."
              className="w-full border-none p-0 outline-none text-xs h-6 "
            />
          </div>
        ))}

        <Button className="rounded-full mt-4">Next</Button>
      </form>
    </div>
  );
}
