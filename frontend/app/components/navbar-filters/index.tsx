import { Logs, MessageCircle, Store, Trophy } from "lucide-react";
import styles from "./navbar-filters.module.scss";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import CategoriesFilter from "./CategoriesFilter";
import { cn } from "~/lib/utils";

export default function NavbarFilters() {
    return (
        <NavigationMenu className={styles.container}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={styles.filter}>
                        <Logs size={20} />
                        Categorías
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <CategoriesFilter />
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.filter, styles.link)} href={"/marketplace"}>
                        <Store size={18}/>
                        Marketplace
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={cn(styles.filter, styles.link, styles.dissapearingFilter)} href={"/direct"}>
                        <MessageCircle size={18}/>
                        Mensajes
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}