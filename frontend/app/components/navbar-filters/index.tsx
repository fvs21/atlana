import { Logs, Trophy } from "lucide-react";
import styles from "./navbar-filters.module.scss";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import CategoriesFilter from "./CategoriesFilter";

export default function NavbarFilters() {
    return (
        <NavigationMenu className={styles.container}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={styles.filter}>
                        <Logs size={20} />
                        Categorías
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className={styles.categoriesContent}>
                        <CategoriesFilter />
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink className={styles.filter} href="/most-sold">
                        <Trophy size={18} />
                        Más vendidos
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}