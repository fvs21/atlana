import NoStoreCreated from "~/features/seller-dashboard/components/NoStoreCreated";
import styles from "./page.module.scss";
import { SidebarTrigger } from "~/components/ui/sidebar";

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