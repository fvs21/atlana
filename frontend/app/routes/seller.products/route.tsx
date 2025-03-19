import { SidebarTrigger } from "~/components/ui/sidebar";
import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className="w-full h-full relative">
            <div className={styles.trigger}>
                <SidebarTrigger />
            </div>
        </div>
    )
}