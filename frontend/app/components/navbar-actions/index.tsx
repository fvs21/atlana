import { Bookmark, ShoppingCart, User } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { useUser } from "~/api/client.auth";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

export default function NavbarActions() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    if (isLoading) {
        return <></>
    }

    return (
        <NavigationMenu style={{ zIndex: 40 }}>
            <NavigationMenuList className={styles.actions}>
                {user ? (
                    <NavigationMenuItem className={styles.dissapearingActionButtons}>
                        <NavigationMenuTrigger className={cn(styles.iconButton, styles.userIconButton)} onClick={() => navigate("/dashboard")}>
                            <img src={user.profile_picture_url} className={styles.profilePicture}/>
                            {user.first_name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={styles.userDropdown}>
                                <li className={styles.dropdownItem}>
                                    <Link to="/dashboard">
                                        <div className={styles.dropdownLink}>
                                           Panel
                                        </div>
                                    </Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link to="/profile">
                                        <div className={styles.dropdownLink}>
                                            Cuenta
                                        </div>
                                    </Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link to="/logout">
                                        <div className={styles.dropdownLink}>
                                            Cerrar sesión
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ) : (
                    <React.Fragment>
                        <NavigationMenuItem className={styles.dissapearingActionButtons}>
                            <NavigationMenuLink asChild>
                                <Link to="/login" className={styles.loginButton}>
                                    Inicia sesión
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className={styles.dissapearingActionButtons}>
                            <NavigationMenuLink asChild>
                                <Button className={styles.registerButton} onClick={() => navigate("/register")}>
                                    Registrate
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </React.Fragment>
                )}
                <NavigationMenuItem className={styles.dissapearingActionButtons}>
                    <NavigationMenuLink asChild className={styles.iconButton}>
                        <Link to="/cart">
                            <ShoppingCart />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}