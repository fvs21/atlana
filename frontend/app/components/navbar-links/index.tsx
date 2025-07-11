import { Book, Hammer, MessageCircle, Star, Store } from "lucide-react";
import styles from "./styles.module.scss";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import { cn } from "~/lib/utils";
import { useLocation } from "@remix-run/react";

export default function NavbarLinks() {
    const location = useLocation();

    return (
        <NavigationMenu className={styles.container}>
            <NavigationMenuList className={styles.menuListContainer}>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.link, (location.pathname.startsWith("/marketplace")) ? styles.selected : styles.notSelected)} href={"/marketplace"}>
                        <Store size={20} />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.link, location.pathname === "/services" ? styles.selected : styles.notSelected)} href={"/services"}>
                    <Hammer size={20} />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.link, location.pathname === "/tutoring" ? styles.selected : styles.notSelected)} href={"/services"}>
                    <Book size={20} />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.link, location.pathname.startsWith("/rating") ? styles.selected : styles.notSelected)} href={"/rating"}>
                    <Star size={20} />
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.link, location.pathname.startsWith("/direct") ? styles.selected : styles.notSelected)} href={"/direct"}>
                        <MessageCircle size={20}/>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}