import styles from "./NoStoreCreated.module.scss";
import { useUser } from "~/api/client.auth";
import { Button } from "~/components/ui/button";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import AddPhoneModal from "../AddPhoneModal";

export default function NoStoreCreated() {
    const { user } = useUser();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className={styles.noStoreCreated}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Registra tu empresa en Poopy y comienza a vender
                </h1>
                <AddPhoneModal open={modalOpen} setOpen={setModalOpen} />
                <Button className={styles.createStoreButton} onClick={!user?.has_phone_verified ? () => setModalOpen(true) : () => navigate("/store/setup")}>
                    Comenzar
                </Button>
            </div>
        </div>
    )
}