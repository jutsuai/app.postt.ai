import Image from "@/components/Image";

export default function OnboardingFInish() {
  return (
    <div className="bg-primary h-dvh flex flex-col w-full">
      <svg
        width="274"
        height="339"
        viewBox="0 0 274 339"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0"
      >
        <path
          d="M427.444 269.479C269.188 306.96 109.538 204.983 70.8791 41.6665C32.2201 -121.65 129.204 -284.408 287.459 -321.89C445.715 -359.371 605.365 -257.394 644.024 -94.0774C682.683 69.2388 585.699 231.997 427.444 269.479Z"
          stroke="white"
        />
        <path
          d="M458.582 262.104C300.327 299.585 140.677 197.608 102.018 34.2915C63.3588 -129.025 160.343 -291.783 318.598 -329.265C476.853 -366.746 636.503 -264.769 675.162 -101.452C713.821 61.8638 616.837 224.622 458.582 262.104Z"
          stroke="white"
        />
        <path
          d="M156.424 192.292L148.661 188.027L148.47 187.923L148.287 188.039L140.88 192.761L144.928 184.82L145.029 184.623L144.914 184.435L140.229 176.768L147.992 181.033L148.182 181.138L148.365 181.021L155.772 176.299L151.724 184.241L151.624 184.437L151.739 184.625L156.424 192.292Z"
          fill="#A7F46A"
          stroke="white"
          stroke-width="0.76"
        />
      </svg>
      <div className="my-auto relative ">
        <Image
          src="/onboarding/background-world.png"
          alt=""
          className="w-full "
        />
        <div className="absolute inset-0 gap-2 px-16 text-center flex flex-col items-center justify-center">
          <Image src="/onboarding/Rectangle.png" alt="" />
          <h5 className="text-white text-2xl font-semibold">Success!</h5>
          <p className="text-white/80 text-xs leading-relaxed">
            Your account has successfully been linked to this application.
          </p>
        </div>
      </div>
    </div>
  );
}
