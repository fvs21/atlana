import { LogOut, MessageCircle, Settings, ShoppingCart, User } from "lucide-react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { useLogout, useUser } from "~/api/client.auth";
import React from "react";
import { Link, useNavigate } from "@remix-run/react";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";
import { cn } from "~/lib/utils";

export default function NavbarActions() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    const { logout } = useLogout();

    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch {
            console.error("Error logging out");
        }
    }

    if (isLoading) {
        return <></>
    }

    return (
        <NavigationMenu style={{ zIndex: 40 }} side="right">
            <NavigationMenuList className={styles.actions}>
                {user ? (
                    <NavigationMenuItem className={styles.dissapearingActionButtons}>
                        <NavigationMenuTrigger className={cn(styles.iconButton, styles.userIconButton)}>
                            <img src={user.profile_picture_url} className={styles.profilePicture} />
                            {user.first_name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className={styles.userDropdown}>
                                {user.has_email_verified && (
                                    <>
                                        <div className={styles.dropdownItem}>
                                            <Link to={"/profile/" + user.id}>
                                                <div className={styles.dropdownLink}>
                                                    <User size={18} />
                                                    Cuenta
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={styles.dropdownItem}>
                                            <Link to={"/direct"}>
                                                <div className={styles.dropdownLink}>
                                                    <MessageCircle size={18} />
                                                    Mensajes
                                                </div>
                                            </Link>
                                        </div>
                                        <div className={styles.dropdownItem}>
                                            <Link to={"/settings/edit"}>
                                                <div className={styles.dropdownLink}>
                                                    <Settings size={18} />
                                                    Configuración
                                                </div>
                                            </Link>
                                        </div>
                                    </>
                                )}
                                <div className={styles.dropdownItem} onClick={handleLogout}>
                                    <div className={styles.dropdownLink}>
                                        <LogOut size={18} />
                                        Cerrar sesión
                                    </div>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ) : (
                    <React.Fragment>
                        <NavigationMenuItem className={styles.dissapearingActionButtons}>
                            <NavigationMenuLink asChild>
                                <Link to="/login">
                                    <Button className={styles.loginButton}>
                                        Iniciar sesión
                                    </Button>
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
            </NavigationMenuList>
        </NavigationMenu>
    )
}