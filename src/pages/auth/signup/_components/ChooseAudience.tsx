import Image from "@/components/Image";
import { Button } from "@/components/ui/button";

export default function ChooseAudience({ navigate }: { navigate: any }) {
  const linkedInAudience = [
    "What is your audience?",
    "Who is your target audience?",
    "What is your industry?",
    "What is your value proposition?",
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
    navigate("/auth/signup?onboarding=preview");
  };
  return (
    <div className="flex min-w-96 flex-col items-center gap-4">
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
            <textarea
              placeholder="Your audience"
              className="w-full border-none p-0 outline-none text-xs h-6 resize-none"
              rows={1}
            />
          </div>
        ))}

        <Button className="rounded-3xl">Next</Button>
      </form>
    </div>
  );
}
