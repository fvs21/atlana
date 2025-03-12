import styles from "./NoStoreCreated.module.scss";
import RegisterStoreModal from "../RegisterStoreModal";
import { toast } from "sonner";

export default function NoStoreCreated() {
    return (
        <div className={styles.noStoreCreated}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Registra tu empresa en Poopy y comienza a vender
                </h1>
                <RegisterStoreModal />
            </div>
        </div>
    )
}