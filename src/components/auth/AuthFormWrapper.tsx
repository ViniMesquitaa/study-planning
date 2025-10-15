import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const AuthFormWrapper = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Card Container */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {/* Form Header */}
          <div className="text-center space-y-2 mb-8">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            )}
          </div>

          {/* Form Content */}
          {children}
        </div>
      </div>
    </div>
  );
};
