import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar";
import styles from "./styles.module.scss";
import { LucideProps, Search } from "lucide-react";
import { NavLink, useLocation, useParams } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import categories from "~/constants/categories";
import { Category } from "~/types/listings";
import MarkeplaceSearchbar from "./MarketplaceSearchbar";

export default function MarketplaceSidebar() {
    const params = useParams();

    const categoryParam = params?.category;    
    

    return (
        <Sidebar className={styles.sidebar}>
            <SidebarHeader className={styles.header}>
                <h2 className={styles.title}>Marketplace</h2>
                <MarkeplaceSearchbar />
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
                                    link={`/marketplace/${category.value}`}
                                    selected={category.value === (categoryParam as Category)}
                                />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

function SidebarButton({ icon, tag, link, selected }: { icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>, tag: string, link: string, selected: boolean }) {
    const Icon = icon;

    const location = useLocation();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={selected || location.pathname === link}>
                <NavLink to={link} className={styles.sidebarButton}>
                    <Icon />
                    <span className={styles.sidebarButtonTag}>{tag}</span>
                </NavLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    )

}