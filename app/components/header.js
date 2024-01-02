import { 
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { 
  HomeIcon,
  UserPlusIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { Web5Connected } from "./connected-web5";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname()
  
  return (
    <div className="flex flex-row p-1 mb-0 w-full justify-center hidden lg:flex">
      {/* HAMBURGER HERE */}
      <List className="text-white flex flex-row">
        <Link href="/vault">
          <ListItem 
            selected={pathname === '/vault' ? true : false} 
            className="text-gray-200 hover:bg-gray-500 hover:text-gray-200 focus:text-gray-200 focus:bg-gray-500"
          >
            <ListItemPrefix>
              <HomeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
        </Link>
        <Link href="/vault/assets">
          <ListItem 
            className="text-gray-200 hover:bg-gray-500 hover:text-gray-200 focus:text-gray-200 focus:bg-gray-500"
            selected={pathname === '/vault/assets' ? true : false} 
          >
            <ListItemPrefix>
              <SparklesIcon className="h-5 w-5" />
            </ListItemPrefix>
            Assets
          </ListItem>
        </Link>
        <Link href="/vault/beneficiaries">
          <ListItem 
            selected={pathname === '/vault/beneficiaries' ? true : false} 
            className="text-gray-200 hover:bg-gray-500 hover:text-gray-200 focus:text-gray-200 focus:bg-gray-500"
          >
            <ListItemPrefix>
              <UserPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Beneficiaries
          </ListItem>
        </Link>
        <Web5Connected />
      </List>
      {/* </div> */}
    </div>
  )
}
