import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import ValidatedInput from "~/components/validated-input";
import TextArea from "~/components/text-area";
import { useState } from "react";

export default function RegisterStoreModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Dialog modal>
            <DialogTrigger>
                <Button className={styles.startButton}>
                    Comienza
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.modalContainer}>
                <div className={styles.formContainer}>
                    <DialogTitle>
                        Registra tu empresa
                    </DialogTitle>
                    <div className={styles.form}>
                        <div className={styles.formInputContainer}>
                            <ValidatedInput 
                                id="storeName"
                                name="storeName"
                                type="text"
                                className={styles.formInput}
                                placeholder="Nombre de la empresa"
                            />
                        </div>
                        <div className={styles.formInputContainer}>
                            <TextArea 
                                id="storeDescription"
                                name="storeDescription"
                                className={styles.formInput}
                                placeholder="Descripción de la empresa"
                                value={description}
                                onChange={setDescription}
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://media.istockphoto.com/id/1189301950/photo/multiethnic-business-people-in-meeting.jpg?s=612x612&w=0&k=20&c=rxE9Jjyvnpu3aUObUkwhIGvC6oVmFvxYDeI8qlZKKKs=" />
                </div>
            </DialogContent>
        </Dialog>
    )
}