import React from "react";
import styles from "./styles.module.scss";
import { Home, LucideProps, MessageCircle, Store, User } from "lucide-react";
import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { useUser } from "~/api/client.auth";

type MobileProviderProps = {
    children: React.ReactNode;
}

type MobileTabProps = {
    name: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
    link: string;
    active: boolean;
}

export default function MobileProvider({ children }: MobileProviderProps) {
    const location = useLocation();
    const path = location.pathname;

    const { user, isLoading } = useUser();

    return (
        <div className={styles.responsiveLayoutContainer}>
            <div className={styles.content}>
                {children}
            </div>
            <div className={styles.mobileTabsContainer}>
                {!isLoading && (
                    <div className={styles.mobileTabs}>
                        <MobileTab
                            name="Inicio"
                            icon={Home}
                            link="/"
                            active={path === "/"}
                        />
                        {user ? (
                            <>
                                <MobileTab
                                    name="Marketplace"
                                    icon={Store}
                                    link="/marketplace"
                                    active={path.startsWith("/marketplace") || path.startsWith("/listing")}
                                />
                                <MobileTab
                                    name="Mensajes"
                                    icon={MessageCircle}
                                    link="/direct"
                                    active={path.startsWith("/direct")}
                                />
                                <MobileTab
                                    name="Perfil"
                                    icon={User}
                                    link={"/profile/" + user.id}
                                    active={path.startsWith("/profile") || path.startsWith("/settings")}
                                />
                            </>
                        ) : (
                            <MobileTab
                                name="Iniciar sesión"
                                icon={User}
                                link="/login"
                                active={path.startsWith("/login") || path.startsWith("/register")}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );

}

function MobileTab({ name, icon, link, active }: MobileTabProps) {
    const Icon = icon;
    return (
        <Link to={link} className={cn(styles.mobileTab, active ? styles.active : "")}>
            <Icon className={styles.icon} size={19} />
            <span className={styles.tabName}>{name}</span>
        </Link>
    );
}