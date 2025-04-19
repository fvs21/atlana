import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import styles from "./styles.module.scss";
import { Armchair, Bike, Building, GraduationCap, House, LucideProps, MapPinHouse, Phone, School, Search, Shirt, TabletSmartphone } from "lucide-react";
import { NavLink } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import categories from "~/constants/categories";

export default function MarketplaceSidebar() {
    return (
        <Sidebar className={styles.sidebar}>
            <SidebarHeader className={styles.header}>
                <h2 className={styles.title}>Marketplace</h2>
                <form className={styles.searchBarContainer} action="/marketplace" method="get">
                    <Search className={styles.searchIcon} size={15} />
                    <input
                        name="search"
                        type="text"
                        className={styles.searchBar}
                        placeholder="Buscar..."
                    />
                </form>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup className={styles.createListingGroup}>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <div className={styles.createListingContainer}>
                                <NavLink to="/create-listing">
                                    <Button className={styles.createListingButton}>
                                        + Crear anuncio
                                    </Button>
                                </NavLink>
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Categorías</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {categories.map((category) => (
                                <SidebarButton
                                    key={category.name}
                                    icon={category.icon}
                                    tag={category.name}
                                    link={`/marketplace?category=${category.value}`}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

function SidebarButton({ icon, tag, link }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>, tag: string, link: string }) {
    const Icon = icon;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <NavLink to={link} className={styles.sidebarButton}>
                    <Icon />
                    <span className={styles.sidebarButtonTag}>{tag}</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )

}