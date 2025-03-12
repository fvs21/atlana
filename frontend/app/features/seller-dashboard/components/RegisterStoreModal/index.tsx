import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { determineStep } from "../../utils";

export default function RegisterStoreModal() {
    const [step, setStep] = useState(0);

    return (
        <Dialog modal>
            <DialogTrigger asChild>
                <Button className={styles.startButton}>
                    Comenzar
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.modalContainer}>
                {determineStep(step, setStep)}
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://media.istockphoto.com/id/1189301950/photo/multiethnic-business-people-in-meeting.jpg?s=612x612&w=0&k=20&c=rxE9Jjyvnpu3aUObUkwhIGvC6oVmFvxYDeI8qlZKKKs=" />
                </div>
            </DialogContent>
        </Dialog>
    )
}