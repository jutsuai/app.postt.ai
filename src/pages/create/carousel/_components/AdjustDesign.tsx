import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ProTooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function AdjustDesign({
  customizations,
  setCustomizations,
}: {
  customizations: any;
  setCustomizations: any;
}) {
  const debounce = useDebouncedCallback((value) => {
    setCustomizations({
      ...customizations,
      ...value,
    });
  }, 500);

  return (
    <div className="flex flex-col gap-2">
      <Label>Adjust Design</Label>

      <div className="flex items-center gap-3 rounded-lg bg-muted p-3">
        <ProTooltip label="Background Color">
          <DesignColor
            color={customizations?.backgroundColor}
            setColor={(c: string) => debounce({ backgroundColor: c })}
          />
        </ProTooltip>

        <Separator
          className="h-8 w-[1px] bg-foreground/10"
          orientation="vertical"
        />

        <ProTooltip label="Font Color">
          <DesignColor
            color={customizations?.fontColor}
            setColor={(c: string) => debounce({ fontColor: c })}
          />
        </ProTooltip>
      </div>
    </div>
  );
}

function DesignColor({
  color = "#00d5f6",
  setColor,
  className,
}: {
  color?: any;
  setColor?: any;
  className?: string;
}) {
  const colorInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    if (colorInputRef?.current) {
      colorInputRef?.current?.click();
    }
  };

  const handleColorChange = (event: any) => {
    const selectedColor = event?.target?.value;
    setColor(selectedColor);
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "relative cursor-pointer rounded-full border p-4",
        className,
      )}
      style={{
        backgroundColor: color,
      }}
    >
      <input
        type="color"
        ref={colorInputRef}
        onChange={handleColorChange}
        className="pointer-events-none absolute top-0 opacity-0"
      />
    </div>
  );
}
