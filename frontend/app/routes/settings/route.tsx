import { Link, MetaFunction, NavLink, Outlet, useLocation } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import { ChevronLeft, Shield, User } from "lucide-react";
import { cn } from "~/lib/utils";

export const meta: MetaFunction = () => (
    [
        { title: "Atlana: Configuración" }
    ]
)

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });

    return null;
}

export default function Page() {
    const location = useLocation();

    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <div className={styles.settingsContainer}>
                <div className={cn(styles.settingsSidebar, location.pathname === "/settings" ? styles.show : styles.hide)}>
                    <h1 className={styles.title}>
                        Configuración
                    </h1>
                    <div className={styles.settingsLinks}>
                        <NavLink to={"/settings/edit"} className={cn(styles.settingsLink, location.pathname === "/settings/edit" ? styles.active : "")}>
                            <User />
                            Perfil
                        </NavLink>
                        <NavLink to={"/settings/security"} className={cn(styles.settingsLink, location.pathname === "/settings/security" ? styles.active : "")}>
                            <Shield />
                            Seguridad
                        </NavLink>
                    </div>
                </div>
                <div className={styles.settingsContent}>
                    <Link className={cn(styles.backButton, location.pathname === "/settings" ? styles.hide : "")} to={"/settings"}>
                        <ChevronLeft />
                    </Link>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}