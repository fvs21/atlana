import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";
import ValidatedInput from "~/components/validated-input";
import { Label } from "~/components/ui/label";

type AddSizeModalProps = {
    open: boolean;
    close: () => void;
}

export default function AddSizeModal({ open, close }: AddSizeModalProps) {
    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agrega talla</DialogTitle>    
                    <DialogDescription>
                        Agrega una talla para tu producto y sus especificaciones
                    </DialogDescription>
                </DialogHeader> 
                <div className={styles.addSizeModal}>
                    <div className="pb-4">
                        <ValidatedInput 
                            label="Talla"
                            placeholder="Ej. S, M, L, XL"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Especificaciones</Label>
                        mdlsa
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}