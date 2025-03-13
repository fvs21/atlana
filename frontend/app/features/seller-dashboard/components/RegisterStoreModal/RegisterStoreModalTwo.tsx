import { DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "~/components/ui/input-otp";
import { useState } from "react";
import { Label } from "~/components/ui/label";
import { useUser } from "~/api/client.auth";
import { Button } from "~/components/ui/button";

export default function RegisterStoreModalTwo({ close }: { close: () => void }) {
    const [otp, setOtp] = useState("");
    const { user } = useUser();

    return (
        <div className={styles.formContainer}>
            <DialogTitle className={styles.formTitle}>
                Confirma tu número de teléfono
            </DialogTitle>
            <div className={styles.form}>
                <Label>
                    Ingresa el código de 6 digitos de verificación que enviamos a {user?.phone_number || "+529992782499"}
                </Label>
                <div className={styles.otpInputContainer}>
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <Button className={styles.continueButton} onClick={close}>
                    Enviar
                </Button>
            </div>
        </div>
    )
}