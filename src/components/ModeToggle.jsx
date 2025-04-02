import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from '@/contexts/ThemeContext';

export function ModeToggle() {
    const { setTheme } = useTheme();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="bg-yellow-500 dark:bg-dark-background hover:bg-yellow-500 hover:bg-opacity-80 dark:hover:bg-dark-background rounded-full h-10 w-10 flex items-center justify-center relative"
                >
                    <Sun className="  rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute   rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-dark-foreground" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"
            >
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('light')}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('dark')}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme('system')}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
