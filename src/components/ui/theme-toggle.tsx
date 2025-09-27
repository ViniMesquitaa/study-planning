import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon"
          className="relative overflow-hidden transition-all duration-200 hover:scale-105"
        >
          <div className="relative">
            <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
              actualTheme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
            }`} />
            <Moon className={`absolute top-0 left-0 h-[1.2rem] w-[1.2rem] transition-all duration-300 ${
              actualTheme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'
            }`} />
          </div>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem 
          onClick={() => setTheme('light')}
          className={`cursor-pointer transition-colors ${
            theme === 'light' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
          }`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('dark')}
          className={`cursor-pointer transition-colors ${
            theme === 'dark' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
          }`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme('system')}
          className={`cursor-pointer transition-colors ${
            theme === 'system' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/50'
          }`}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto text-xs">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
