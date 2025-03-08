import { Button } from "~/components/ui/button";
import styles from "./NoStoreCreated.module.scss";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";

export default function NoStoreCreated() {
    return (
        <div className={styles.noStoreCreated}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Registra tu empresa en Poopy y comienza a vender
                </h1>
                <Dialog>
                    <DialogTrigger>
                        <Button className={styles.startButton}>
                            Comienza
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        njdksan
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}