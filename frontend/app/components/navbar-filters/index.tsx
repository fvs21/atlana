import { Logs, Store, Trophy } from "lucide-react";
import styles from "./navbar-filters.module.scss";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import CategoriesFilter from "./CategoriesFilter";
import { Link } from "@remix-run/react";

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
                    <NavigationMenuLink className={styles.filter} href={"/marketplace"}>
                        <Store size={18}/>
                        Marketplace
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}