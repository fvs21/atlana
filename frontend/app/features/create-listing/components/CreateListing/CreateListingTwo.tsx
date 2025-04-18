import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingPriceAtom, stepAtom } from "../../store";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import ValidatedInput from "~/components/validated-input";

export default function CreateListingTwo() {
    const [, setStep] = useAtom(stepAtom);

    const [price, setPrice] = useAtom(listingPriceAtom);    

    const next = () => {

        setStep(2);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(0)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={styles.createListing}>
                <div className={styles.createListingOneTitle}>
                    Elige el precio
                </div>
                <div className={styles.description}>
                    Elige el precio del producto que quieres vender. Al final se le agregará una comisión para la protección del comprador...
                </div>
                <div className="pt-4">
                </div>
                <div className={styles.formInput}>
                    <ValidatedInput 
                        id="price"
                        name="price"
                        label="Precio"
                        placeholder="$MXN"
                        value={price}
                        onChange={(val) => setPrice(parseFloat(val))}
                        type="number"
                        error=""
                    />
                </div>
                <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                    <Button className="primaryButton" onClick={next}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    )
}