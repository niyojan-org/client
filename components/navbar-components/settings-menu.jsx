import { IconSettings } from "@tabler/icons-react"
import { IconMoon, IconSun, IconLanguage, IconHelpCircle, IconShieldCheck, IconContrast2, IconSettings2 } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useUserStore } from "@/store/userStore"

export default function SettingsMenu() {
  const { theme, setTheme } = useTheme()
  const { isAuthenticated } = useUserStore();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full shadow-none size-8"
          aria-label="Open settings menu">
          <IconSettings className="text-muted-foreground" size={16} aria-hidden="true" />
        </Button>
      } >

      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 w-full" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer w-full">
          {theme === "dark" ? (
            <IconSun size={16} className="opacity-60" aria-hidden="true" />
          ) : (
            <IconMoon size={16} className="opacity-60" aria-hidden="true" />
          )}
          <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </DropdownMenuItem>

        {isAuthenticated && (
          <DropdownMenuItem >
            <Link href={'/profile/security'} className="cursor-pointer flex items-center gap-2">
              <IconSettings2 size={16} className="opacity-60" aria-hidden="true" />
              <span>Account Security</span>
            </Link>
          </DropdownMenuItem>
        )}

        {/* <DropdownMenuItem onClick={() => toast.info('Language settings coming soon!')}>
          <IconLanguage size={16} className="opacity-60" aria-hidden="true" />
          <span>Language</span>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href={'/contact'} className="cursor-pointer flex items-center gap-2">
            <IconHelpCircle size={16} className="opacity-60 " aria-hidden="true" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem >
          <Link href={'/privacy-policy'} className="cursor-pointer flex items-center gap-2">
            <IconShieldCheck size={16} className="opacity-60" aria-hidden="true" />
            <span>Privacy</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem >
          <Link href={'/terms-and-conditions'} className="cursor-pointer flex items-center gap-2">
            <IconContrast2 size={16} className="opacity-60" aria-hidden="true" />
            <span>Terms & Conditions</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}