import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { SidebarMenuButton } from "~/components/ui/sidebar";
import styles from "./DashboardSidebar.module.scss";
import { ChevronUp } from "lucide-react";
import { useLogout, useUser } from "~/api/client.auth";
import { Skeleton } from "~/components/ui/skeleton";
import { useNavigate } from "@remix-run/react";
import { translateUserType } from "../../utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

export default function UserDropdown({ dashboard }: { dashboard: 'buyer' | 'seller' }) {
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
                <SidebarMenuButton size="lg">
                    <div className={styles.userInfo}>
                        <Avatar className={styles.userAvatar}>
                            <AvatarImage src={user?.profile_picture_url} alt={'pfp'} />
                            <AvatarFallback>
                                <Skeleton />
                            </AvatarFallback>
                        </Avatar>
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
                {dashboard === "buyer" ? (
                    <DropdownMenuItem className={styles.userDropdownOption} onClick={() => navigate("/seller")}>
                        <span>Vender</span>
                    </DropdownMenuItem>
                ) : (
                    <DropdownMenuItem className={styles.userDropdownOption} onClick={() => navigate("/dashboard")}>
                        <span>Comprador</span>
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem className={styles.userDropdownOption} onClick={handleLogout}>
                    <span>Cerrar sesión</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}