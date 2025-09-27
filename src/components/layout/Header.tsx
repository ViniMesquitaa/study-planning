import { BookOpen, Clock, BarChart3, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-card border-b">
      <div className="mx-auto max-w-7xl py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/landing"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div>
              <p className="text-md font-light text-muted-foreground">
                Organize seus estudos
              </p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              asChild
            >
              <Link to="/landing">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden md:inline">Dashboard</span>
              </Link>
            </Button>

            <Button
              variant={isActive("/subjects") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              asChild
            >
              <Link to="/subjects">
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Matérias</span>
              </Link>
            </Button>

            <Button
              variant={isActive("/pomodoro") ? "default" : "ghost"}
              size="sm"
              className="gap-2"
              asChild
            >
              <Link to="/pomodoro">
                <Clock className="w-4 h-4" />
                <span className="hidden md:inline">Pomodoro</span>
              </Link>
            </Button>
          </nav>

          <div className="cursor-pointer hover:opacity-80 transition-opacity">
            <LogOut className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
