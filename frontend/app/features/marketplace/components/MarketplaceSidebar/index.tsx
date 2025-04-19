import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import styles from "./styles.module.scss";
import { Phone, Search } from "lucide-react";
import { NavLink } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export default function MarketplaceSidebar() {
    return (
        <Sidebar className={styles.sidebar}>
            <SidebarHeader className={styles.header}>
                <h2 className={styles.title}>Marketplace</h2>
                <div className={styles.searchBarContainer}>
                    <Search className={styles.searchIcon} size={15}/>
                    <input
                        type="text"
                        className={styles.searchBar}
                        placeholder="Buscar..."
                    />
                </div>
                <div className={styles.createListingContainer}>
                    <NavLink to="/create-listing">
                        <Button className={styles.createListingButton}>
                            + Crear anuncio
                        </Button>
                    </NavLink>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Categorías</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarButton 
                                icon={<Phone fill="black" />} 
                                tag="Electrónicos" 
                                link="/marketplace?category=electronics" 
                            />
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

function SidebarButton({icon, tag, link}: {icon: React.ReactNode, tag: string, link: string}) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild>
                <NavLink to={link} className={styles.sidebarButton}>
                    {icon}
                    <span className={styles.sidebarButtonTag}>{tag}</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )

}