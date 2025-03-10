import NoStoreCreated from "~/features/seller-dashboard/components/NoStoreCreated";
import styles from "./page.module.scss";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { onlyAuthenticated } from "~/api/server.auth";
import { LoaderFunctionArgs } from "@remix-run/node";

export async function loader({request}: LoaderFunctionArgs) {
    onlyAuthenticated({request});

    return {};
}

export default function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.trigger}>
                <SidebarTrigger />
            </div>
            <NoStoreCreated />
        </div>
    )
}