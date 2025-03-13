import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { determineStep } from "../../utils";
import { useUser } from "~/api/client.auth";

export default function RegisterStoreModal() {
    const { user } = useUser();    

    const [step, setStep] = useState(user?.phone_number ? 1 : 0);
    const [open, setOpen] = useState(false);

    const next = () => setStep(1);
    const close = () => setOpen(false);

    return (
        <Dialog modal open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={styles.startButton}>
                    Comenzar
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.modalContainer} aria-describedby="register-store-modal">
                {determineStep(step, next, close)}
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://media.istockphoto.com/id/1189301950/photo/multiethnic-business-people-in-meeting.jpg?s=612x612&w=0&k=20&c=rxE9Jjyvnpu3aUObUkwhIGvC6oVmFvxYDeI8qlZKKKs=" />
                </div>
            </DialogContent>
        </Dialog>
    )
}