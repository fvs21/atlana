import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCustomizableAtom, stepAtom } from "../../store";
import { cn } from "~/lib/utils";
import LabeledCheckbox from "~/components/labeled-checkbox";
import { Button } from "~/components/ui/button";

export default function CreateListingThree() {
    const [customizable, setCustomizable] = useAtom(listingCustomizableAtom);
    const [, setStep] = useAtom(stepAtom);

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(1)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={cn(styles.createListing, styles.createListingTwo)}>
                <h1 className={styles.createListingOneTitle}>
                    Elige las opciones para tu publicación
                </h1>
                <div>
                    <div className={styles.formInput}>
                        <LabeledCheckbox
                            id="customizable"
                            label="Tu producto es personalizable? (color, talla, modelo)"
                            checked={customizable}
                            onChange={setCustomizable}
                        />
                    </div>
                    {!!customizable && (
                        <div>
                            mkflsa
                        </div>
                    )}
                </div>
                <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                    <Button className="primaryButton" onClick={() => setStep(3)}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    )
}