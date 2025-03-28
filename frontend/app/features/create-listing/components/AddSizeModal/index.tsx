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
import { SizeSpecs } from "../../types";

type AddSizeModalProps = {
    open: boolean;
    close: () => void;
}

export default function AddSizeModal({ open, close }: AddSizeModalProps) {
    const [listingOptions, setListingOptions] = useAtom(listingCustomOptionsAtom);

    const [sizeName, setSizeName] = useState<string>("");

    const [showAddSpec, setShowAddSpec] = useState<boolean>(false);
    const [spec, setSpec] = useState<keyof SizeSpecs | null>();
    const [value, setValue] = useState<string>("");

    const [specs, setSpecs] = useState<SizeSpecs>({});

    const availableSpecs = Object.keys(sizeSpecs)
        .filter(spec => !Object.keys(specs).includes(spec))
        .map(spec => sizeSpecs[spec as keyof SizeSpecs]);

    const addSpec = () => {
        if (!spec || !value) return;

        const originalSpecName = Object.keys(sizeSpecs).find(key => sizeSpecs[key as keyof SizeSpecs] === spec) as string;

        setSpecs({
            ...specs,
            [originalSpecName]: parseInt(value)
        });

        setSpec(null);
        setValue("");
    };

    const closeModal = () => {
        setSizeName("");
        setSpecs({});
        setShowAddSpec(false);
        close();
    }

    const saveSize = () => {
        if (!sizeName || !Object.keys(specs).length) return;

        const newSize = {
            name: sizeName,
            specifications: specs
        };

        setListingOptions({
            ...listingOptions,
            size: [
                ...listingOptions.size!,
                newSize
            ]
        });

        closeModal();
    }

    return (
        <Dialog open={open} onOpenChange={closeModal}>
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
                            value={sizeName}
                            onChange={setSizeName}
                        />
                    </div>
                    {specs && (
                        <div className={styles.addedSpecs}>
                            {Object.keys(specs).map((spec) => (
                                <div key={spec} className={styles.addedSpec}>
                                    <b>{sizeSpecs[spec as keyof SizeSpecs]}</b>: {specs[spec as keyof SizeSpecs]}cm
                                </div>
                            ))}
                        </div>
                    )}
                    {showAddSpec && (
                        <div className={styles.addSpecContainer}>
                            <LabeledSelect
                                name="specification"
                                label="Medida"
                                options={availableSpecs}
                                value={spec || ""}
                                onChange={(value) => setSpec(value as keyof SizeSpecs)}
                                className={styles.addSpecInput}
                            />
                            <ValidatedInput
                                label="Valor"
                                placeholder="cm"
                                type="number"
                                className={styles.addSpecInput}
                                value={value}
                                onChange={setValue}
                            />
                            <Button className="primaryButton" onClick={addSpec}>
                                <Plus />
                            </Button>
                        </div>
                    )}
                    {!showAddSpec ? (
                        <button className={styles.addSpecButton} onClick={() => setShowAddSpec(true)}>
                            + Agregar medida
                        </button>
                    ) : (
                        <button className={styles.addSpecButton} onClick={() => setShowAddSpec(false)}>
                            - Deshacer
                        </button>
                    )}
                    <div className={styles.addSizeModalSave}>
                        <Button className="primaryButton" onClick={saveSize}>
                            Guardar
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}