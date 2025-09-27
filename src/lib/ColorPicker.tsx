import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "@/lib/utils";

const COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#8b5cf6", // violet-500
  "#ef4444", // red-500
  "#ec4899", // pink-500
  "#14b8a6", // teal-500
];

type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ color, onChange }: ColorPickerProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start gap-2">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span>{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-7 gap-2">
          {COLORS.map((c) => (
            <button
              key={c}
              className={cn(
                "w-8 h-8 rounded-full transition-transform hover:scale-110",
                color === c ? "ring-2 ring-offset-2 ring-gray-400" : ""
              )}
              style={{ backgroundColor: c }}
              onClick={() => {
                onChange(c);
                setOpen(false);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
