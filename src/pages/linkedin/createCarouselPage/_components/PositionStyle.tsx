import { cn } from "@/lib/utils";

export default function PositionStyle({
  position: initialPosition,
  setPosition,
}: {
  position: string;
  setPosition: (value: string) => void;
}) {
  // const { positionOptions } = useCarosel();

  const positionOptions = ["center", "left", "right"];

  return (
    <div className="border ml-auto mr-3 flex items-center justify-around overflow-hidden rounded-md bg-background">
      {(positionOptions as any)?.map((position: any) => (
        <>
          <button
            key={position}
            onClick={() => setPosition(position)}
            className={cn(
              "text-xs transition-all duration-200 p-1 px-2 capitalize",
              initialPosition === position
                ? " bg-primary-foreground"
                : " text-muted-foreground hover:text-foreground"
            )}
          >
            {position}
          </button>
          <span className="h-[24px] last:hidden w-[1px] bg-border" />
        </>
      ))}
    </div>
  );
}
