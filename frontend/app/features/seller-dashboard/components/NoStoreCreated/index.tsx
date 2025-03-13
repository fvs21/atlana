import styles from "./NoStoreCreated.module.scss";
import RegisterStoreModal from "../RegisterStoreModal";
import { useUser } from "~/api/client.auth";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";

export default function NoStoreCreated() {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className={styles.noStoreCreated}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Registra tu empresa en Poopy y comienza a vender
                </h1>
                {!user?.has_phone_verified ? (
                    <RegisterStoreModal />
                ) : (
                    <Button className={styles.createStoreButton} onClick={() => navigate("/store/setup")}>
                        Comenzar
                    </Button>
                )}   
            </div>
        </div>
    )
}