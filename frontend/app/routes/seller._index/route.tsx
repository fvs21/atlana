import NoStoreCreated from "~/features/seller-dashboard/components/NoStoreCreated";
import styles from "./page.module.scss";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { onlyAuthenticated } from "~/api/server.auth";
import { LoaderFunctionArgs } from "@remix-run/node";
import { toast } from "sonner";
import { useUser } from "~/api/client.auth";

export async function loader({request}: LoaderFunctionArgs) {
    onlyAuthenticated({request});

    return {};
}

export default function Page() {
    const { user, isLoading } = useUser();

    return (
        <div className={styles.container}>
            <div className={styles.trigger}>
                <SidebarTrigger />
            </div>
            {!isLoading && <NoStoreCreated />}
        </div>
    )
}