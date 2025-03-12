import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import PhoneInput from "~/components/phone-input";

export default function RegisterStoreModal() {
    const [countryCode, setCountryCode] = useState("+52");
    const [phoneNumber, setPhoneNumber] = useState("");

    return (
        <Dialog modal>
            <DialogTrigger>
                <Button className={styles.startButton}>
                    Comienza
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.modalContainer}>
                <div className={styles.formContainer}>
                    <DialogTitle className={styles.formTitle}>
                        Agrega tu número de teléfono para comenzar
                    </DialogTitle>
                    <div className={styles.form}>
                        <PhoneInput 
                            countryCode={countryCode}
                            phoneNumber={phoneNumber}
                            setCountryCode={setCountryCode}
                            setPhoneNumber={setPhoneNumber}
                            label="Número de teléfono"
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <Button className={styles.continueButton}>
                            Continuar
                        </Button>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://media.istockphoto.com/id/1189301950/photo/multiethnic-business-people-in-meeting.jpg?s=612x612&w=0&k=20&c=rxE9Jjyvnpu3aUObUkwhIGvC6oVmFvxYDeI8qlZKKKs=" />
                </div>
            </DialogContent>
        </Dialog>
    )
}