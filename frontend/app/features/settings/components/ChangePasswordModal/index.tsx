import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { useState } from "react";
import { useChangePassword } from "../../api";
import { toast } from "sonner";
import {  AxiosError } from "axios";
import { ResponseBody } from "~/types/globals";
import PasswordInput from "~/components/password-input";

type ChangePasswordInput = {
    password: string;
    error: string;
}

export default function ChangePasswordModal({ open, close }: { open: boolean, close: () => void }) {
    const [currentPassword, setCurrentPassword] = useState<ChangePasswordInput>({
        password: "",
        error: ""
    });
    const [newPassword, setNewPassword] = useState<ChangePasswordInput>({
        password: "",
        error: ""
    });
    const [confirmNewPassword, setConfirmNewPassword] = useState<ChangePasswordInput>({
        password: "",
        error: ""
    });

    const { changePassword, isPending, changePasswordDisabled } = useChangePassword();

    async function handleChangePassword(e: React.FormEvent) {
        e.preventDefault();

        if(changePasswordDisabled) return;

        setCurrentPassword({ ...currentPassword, error: "" });
        setNewPassword({ ...newPassword, error: "" });
        setConfirmNewPassword({ ...confirmNewPassword, error: "" });

        if (newPassword.password !== confirmNewPassword.password) {
            setNewPassword({ ...newPassword, error: "Las contraseñas no coinciden." });
            setConfirmNewPassword({ ...confirmNewPassword, error: "Las contraseñas no coinciden." });
            return;
        }

        if (newPassword.password.length < 8) {
            setNewPassword({ ...newPassword, error: "La nueva contraseña debe tener al menos 8 caracteres." });
            return;
        }

        try {
            await changePassword({
                current_password: currentPassword.password,
                new_password: newPassword.password
            });
            toast.success("Contraseña actualizada.");
            setCurrentPassword({ password: "", error: "" });
            setNewPassword({ password: "", error: "" });
            setConfirmNewPassword({ password: "", error: "" });
            close();
        } catch(e) {
            const error = (e as AxiosError).response?.data as ResponseBody<null>;

            switch(error.code) {
                case "incorrect_password":
                    setCurrentPassword({ ...currentPassword, error: "Contraseña incorrecta." });
                    break;
                case "insecure_password":
                    setNewPassword({ ...newPassword, error: "La nueva contraseña debe tener al menos 8 caracteres." });
                    break;
                case "user_already_changed_password":
                    toast.error("Ya has cambiado tu contraseña recientemente. Inténtalo de nuevo más tarde.");
                    break;
                default:
                    toast.error("Error inesperado. Inténtalo de nuevo más tarde.");
            }
        }
        
    }

    return (
        <Dialog open={open} onOpenChange={close} modal>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Cambiar contraseña
                    </DialogTitle>
                    <DialogDescription>
                        Ingresa tu contraseña actual y la nueva contraseña que deseas establecer. Asegúrate de que la nueva contraseña sea de al menos 8 caracteres.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleChangePassword}>
                    <div className={styles.formInput}>
                        <PasswordInput
                            type="password"
                            name="currentPassword"
                            label="Contraseña actual"
                            placeholder="Escribe tu contraseña actual"
                            className={styles.changePasswordInput}
                            value={currentPassword.password}
                            onChange={(password) => setCurrentPassword({ password, error: "" })}
                            error={currentPassword.error}
                        />
                    </div>
                    <div className={styles.formInput}>
                        <PasswordInput
                            type="password"
                            name="newPassword"
                            label="Nueva contraseña"
                            placeholder="Escribe tu nueva contraseña"
                            className={styles.changePasswordInput}
                            value={newPassword.password}
                            onChange={(password) => setNewPassword({ password, error: "" })}
                            error={newPassword.error}
                        />
                    </div>
                    <div className={styles.formInput}>
                        <PasswordInput
                            type="password"
                            name="confirmNewPassword"
                            label="Confirmar nueva contraseña"
                            placeholder="Confirma tu nueva contraseña"
                            className={styles.changePasswordInput}
                            value={confirmNewPassword.password}
                            onChange={(password) => setConfirmNewPassword({ password, error: "" })}
                            error={confirmNewPassword.error}
                        />
                    </div>
                    <Button
                        className={styles.changePasswordBtn} 
                        size="default2" 
                        type="submit"
                        isFetching={isPending}
                    >
                        Cambiar contraseña
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}