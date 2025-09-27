import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { cn } from "@/lib/utils";

const COLORS = [
  "#3a5fcd", // azul pastel escuro
  "#2e7d63", // verde pastel escuro
  "#b37f00", // amarelo mostarda escuro
  "#6b4dc4", // violeta pastel escuro
  "#b32f2f", // vermelho queimado escuro
  "#b23b73", // rosa escuro
  "#0f6260", // teal escuro
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
