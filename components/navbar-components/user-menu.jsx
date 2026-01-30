import {
  IconBolt,
  IconBook,
  IconLayers,
  IconLogout,
  IconPin,
  IconUserEdit,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
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
import { useUserStore } from "@/store/userStore"
import Link from "next/link"
import { IconLoader2, IconLoader3, IconLogout2, IconShield, IconTicket, IconUser } from "@tabler/icons-react"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const { user, isAuthenticated, logout, loading } = useUserStore();
  const router = useRouter();

  if (!isAuthenticated) {
    if (loading) {
      return <IconLoader3 className="animate-spin text-primary" />;
    }
    return (
      <Button variant="outline" >
        <Link href={'/auth'}>
          Login
        </Link>
      </Button>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={user?.avatar || "/origin/avatar.jpg"} alt="Profile image" />
            <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
          </Avatar>
        </Button>
      }>

      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64 w-full" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-medium text-foreground">
              {user?.name || "User"}
            </span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              {user?.email || "user@email.com"}
            </span>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={'/profile'} className={'flex items-center gap-2'}>
              <IconUser size={16} className="opacity-60" aria-hidden="true" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <Link href={'/profile/security'} className={'flex items-center gap-2'}>
              <IconShield size={16} className="opacity-60" aria-hidden="true" />
              <span>Security</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem >
            <Link href={'/profile/tickets'} className={'flex items-center gap-2'}>
              <IconTicket size={16} className="opacity-60" aria-hidden="true" />
              <span>Ticket History</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logout();
            router.push("/");
          }}
        >
          <IconLogout2 size={16} className="opacity-60" aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function SheetDownMenu({ onClose }) {
  const { user, isAuthenticated, logout } = useUserStore();
  const router = useRouter();

  if (!isAuthenticated) {
    return (
      <div className="px-3 py-2">
        <Button variant="outline" className="w-full" >
          <Link href={'/auth'} onClick={onClose}>
            Login
          </Link>
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    if (onClose) onClose();
    router.push("/");
  };

  return (
    <div className="flex flex-col">
      {/* User Info Section */}
      <div className="flex items-center px-3 pb-2 gap-3 border-b">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user?.avatar || "/origin/avatar.jpg"} alt="Profile image" />
          <AvatarFallback>{user?.name ? user.name[0] : "U"}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="truncate text-sm font-medium text-foreground">
            {user?.name || "User"}
          </span>
          <span className="truncate text-xs text-muted-foreground font-mono">
            {user?.email || "not-provided"}
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col gap-1 py-2">
        <Link
          href="/profile"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent rounded-md mx-2 transition-colors"
        >
          <IconUser size={18} className="text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium">Profile</span>
        </Link>

        <Link
          href="/profile/security"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent rounded-md mx-2 transition-colors"
        >
          <IconShield size={18} className="text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium">Security</span>
        </Link>

        <Link
          href="/profile/tickets"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent rounded-md mx-2 transition-colors"
        >
          <IconTicket size={18} className="text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium">Ticket History</span>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="border-t pt-2 pb-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 hover:bg-accent rounded-md mx-2 transition-colors w-[calc(100%-1rem)] text-left"
        >
          <IconLogout2 size={18} className="text-muted-foreground" aria-hidden="true" />
          <span className="text-sm font-medium text-destructive">Logout</span>
        </button>
      </div>
    </div>
  );
}