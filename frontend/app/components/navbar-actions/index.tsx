import { ShoppingCart, User } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { useUser } from "~/api/client.auth";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";

export default function NavbarActions() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    if (isLoading) {
        return <></>
    }

    return (
        <NavigationMenu style={{ zIndex: 100 }}>
            <NavigationMenuList className={styles.actions}>
                {user ? (
                    <NavigationMenuItem className={styles.dissapearingActionButtons}>
                        <NavigationMenuTrigger className={styles.iconButton} onClick={() => navigate("/dashboard")}>
                            <User />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className={styles.userDropdown}>
                                <li className={styles.dropdownItem}>
                                    <Link to="/dashboard">
                                        <div className={styles.dropdownLink}>
                                           Panel de comprador 
                                        </div>
                                    </Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link to="/account">
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
                            <NavigationMenuLink>
                                <Link to="/login" className={styles.loginButton}>
                                    Inicia sesión
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem className={styles.dissapearingActionButtons}>
                            <NavigationMenuLink>
                                <Button className={styles.registerButton} onClick={() => navigate("/register")}>
                                    Registrate
                                </Button>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </React.Fragment>
                )}
                <NavigationMenuItem className={styles.dissapearingActionButtons}>
                    <NavigationMenuLink className={styles.iconButton}>
                        <Link to="/cart">
                            <ShoppingCart />
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}