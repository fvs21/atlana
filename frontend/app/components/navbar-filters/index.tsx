import { Logs, Trophy } from "lucide-react";
import styles from "./navbar-filters.module.scss";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
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
                    <NavigationMenuTrigger className={styles.filter}>
                        <Trophy size={18} />
                        Más vendidos
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        njdsu
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}