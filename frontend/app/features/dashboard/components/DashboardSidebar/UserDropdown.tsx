import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import styles from "./DashboardSidebar.module.scss";
import { ChevronUp } from "lucide-react";
import { useLogout, useUser } from "~/api/client.auth";
import { Skeleton } from "~/components/ui/skeleton";
import { useNavigate } from "@remix-run/react";
import { translateUserType } from "../../utils";

export default function UserDropdown() {
    const { user, isLoading } = useUser();

    const navigate = useNavigate();
    const { logout } = useLogout();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <div className={styles.userInfo}>
                        {isLoading ? (
                            <Skeleton className={styles.userAvatar} />
                        ) : (
                            <img className={styles.userAvatar} src={user?.profile_picture_url} />
                        )}
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>{user?.first_name}</span>
                            <span className={styles.userRole}>{translateUserType(user?.user_type)}</span>
                        </div>
                    </div>
                    <ChevronUp style={{marginLeft: "auto"}}/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem className={styles.userDropdownOption}>
                    <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem className={styles.userDropdownOption} onClick={handleLogout}>
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}