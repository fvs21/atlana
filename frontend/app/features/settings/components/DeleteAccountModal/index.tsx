import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { DialogDescription } from "@radix-ui/react-dialog";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import { useDeleteAccount } from "../../api";
import { useState } from "react";
import { AxiosError } from "axios";
import { ResponseBody } from "~/types/globals";
import { useNavigate } from "@remix-run/react";

export default function DeleteAccountModal({ open, close }: { open: boolean, close: () => void }) {
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { deleteAccount, isPending, deleteAccountDisabled } = useDeleteAccount();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        if(deleteAccountDisabled) return;

        setError("");
        
        try {
            await deleteAccount({ password });
            navigate("/register");
        } catch (e) {
            const error = (e as AxiosError).response?.data as ResponseBody<null>;

            switch(error.code) {
                case "incorrect_password":
                    setPassword("");
                    setError("La contraseña es incorrecta.");
                    break;
                case "invalid_data":
                    setError("Error insesperado.")
                    break;
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={close} modal>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Estás seguro que quieres eliminar tu cuenta?
                    </DialogTitle>
                    <DialogDescription className={styles.deleteAccountDescription}>
                        Esta acción es irreversible y eliminará todos tus datos de forma permanente. Si estás seguro, escribe tu contraseña para eliminar tu cuenta.
                    </DialogDescription>
                </DialogHeader>
                <div className="pb-4">
                    <ValidatedInput
                        type="password"
                        name="password"
                        label="Contraseña"
                        placeholder="Escribe tu contraseña"
                        className={styles.deleteAccountInput}
                        value={password}
                        onChange={setPassword}
                        error={error}
                    />
                </div>
                <div>
                    <Button 
                        className="w-full" 
                        variant="destructive" 
                        size="default2" 
                        onClick={handleDeleteAccount}
                        isFetching={isPending}
                        disabled={deleteAccountDisabled}
                    >
                        Eliminar cuenta
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );

}