import type React from "react";
import { FaArrowRight } from "react-icons/fa";
import { cn } from "@/lib/utils";

export interface BtnDefaultUIProps {
  onclick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const BtnDefaultUI: React.FC<BtnDefaultUIProps> = ({
  onclick,
  type = "submit",
  label,
  className = "",
}) => {
  return (
    <button
      onClick={onclick}
      type={type}
      className={cn(
        // Base styles from shadcn button
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium font-inter ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-[1.02] active:scale-[0.98]",
        // Default variant styles
        "bg-gradient-primary text-primary-foreground hover:shadow-md shadow-sm",
        // Default size
        "h-10 px-4 py-2",
        // Custom layout for label and arrow
        "justify-between px-6 py-3",
        className
      )}
    >
      <span className="flex-grow text-center">{label}</span>
      <FaArrowRight className="ml-2" />
    </button>
  );
};

export default BtnDefaultUI;
