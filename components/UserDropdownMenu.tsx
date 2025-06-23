import { useAuth0 } from "@auth0/auth0-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom";
import { LogoutButton } from "./LogoutButton";

export function UserDropdownMenu() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <article>Loading ...</article>;
  }

  const isUserDataAvailable = isAuthenticated && (user !== undefined)

  return (
    isUserDataAvailable && (
      <DropdownMenu>
        <DropdownMenuTrigger className="!border-none !active:!border-none focus:!border-none">
          <img src={user.picture} alt={user.name} className="size-10 rounded-full border-[#265F1A]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-[9999] [&_*]:!text-md [&_*]:!text-gray-800 [&_*:hover]:!text-greenGandolini [&_*:hover]:!arno">
          <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><Link to="/profile">Mi Perfil</Link></DropdownMenuItem>
          <DropdownMenuItem><Link to="/eventos">Mis Eventos</Link></DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  )
}
