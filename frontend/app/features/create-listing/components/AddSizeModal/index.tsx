import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";
import ValidatedInput from "~/components/validated-input";
import { sizeSpecs } from "../../utils/variables";
import LabeledSelect from "~/components/labeled-select";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

type AddSizeModalProps = {
    open: boolean;
    close: () => void;
}

export default function AddSizeModal({ open, close }: AddSizeModalProps) {
    const [listingOptions, setListingOptions] = useAtom(listingCustomOptionsAtom);

    const [addSpec, setAddSpec] = useState<boolean>(false);
    const [spec, setSpec] = useState<string>("");

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
                    {addSpec && (
                        <div className={styles.addSpecContainer}>
                            <LabeledSelect
                                name="specification"
                                label="Medida"
                                options={sizeSpecs.map(spec => spec[1])}
                                value={spec}
                                onChange={(value) => setSpec(value)}
                                className={styles.addSpecInput}
                            />
                            <ValidatedInput
                                label="Valor" 
                                placeholder="cm"
                                type="number"
                                className={styles.addSpecInput}
                            />
                            <Button className="primaryButton">
                                <Plus />
                            </Button>
                        </div>
                    )}
                    {!addSpec ? (
                        <button className={styles.addSpecButton} onClick={() => setAddSpec(true)}>
                            + Agregar medida
                        </button>
                    ) : (
                        <button className={styles.addSpecButton} onClick={() => setAddSpec(false)}>
                            - Deshacer
                        </button>
                    )}
                    <div className={styles.addSizeModalSave}>
                        <Button className="primaryButton">
                            Guardar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}