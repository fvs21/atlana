import { DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import PhoneInput from "~/components/phone-input";
import { toast } from "sonner";
import { useUpdatePhoneNumber } from "../../api";

export default function RegisterStoreModalOne({ setStep }: { setStep: (step: number) => void }) {
    const [countryCode, setCountryCode] = useState("+52");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [error, setError] = useState("");

    const { update, isPending, updateDisabled } = useUpdatePhoneNumber();

    const handleUpdate = async () => {
        if(updateDisabled) return;

        setError("");

        if(!phoneNumber || !countryCode) {
            setError("Coloca tu número de teléfono.");
            return;
        }

        toast.success("El código de verificación ha sido enviado a tu número de teléfono.");
        setStep(1);
    }

    return (
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
                    error={error}
                    name="phoneNumber"
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button className={styles.continueButton} onClick={handleUpdate} disabled={isPending}>
                    Continuar
                </Button>
            </div>
        </div>
    )
}