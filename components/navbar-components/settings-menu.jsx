import { SettingsIcon } from "lucide-react"
import { IconMoon, IconSun, IconLanguage, IconHelpCircle, IconShieldCheck } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import Link from "next/link"
import { toast } from "sonner"

export default function SettingsMenu() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none size-8"
          aria-label="Open settings menu">
          <SettingsIcon className="text-muted-foreground" size={16} aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleTheme}>
          {theme === "dark" ? (
            <IconSun size={16} className="opacity-60" aria-hidden="true" />
          ) : (
            <IconMoon size={16} className="opacity-60" aria-hidden="true" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </DropdownMenuItem>

        {/* <DropdownMenuItem onClick={() => toast.info('Language settings coming soon!')}>
          <IconLanguage size={16} className="opacity-60" aria-hidden="true" />
          <span>Language</span>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => toast.info('Privacy settings coming soon!')}>
          <IconShieldCheck size={16} className="opacity-60" aria-hidden="true" />
          <span>Privacy</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={'/contact'}>
            <IconHelpCircle size={16} className="opacity-60" aria-hidden="true" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}