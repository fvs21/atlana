import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingPricesAtom, stepAtom } from "../../store";
import ListingPriceInput from "../ListingPriceInput";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

export default function CreateListingFour() {
    const [, setStep] = useAtom(stepAtom);

    const [prices, setPrices] = useAtom(listingPricesAtom);    

    const next = () => {
        if (prices.length === 0 || (!prices[0].min_units || !prices[0].price)) {
            toast.error("Agrega al menos un precio");
            return;
        }

        setStep(4);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(2)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={styles.createListing}>
                <div className={styles.createListingOneTitle}>
                    Agrega los precios
                </div>
                <div className={styles.description}>
                    Agrega los precios para cada rango de unidades. Puedes agregar más de un precio por producto.
                </div>
                <div className="pt-4">
                    <ListingPriceInput
                        value={prices}
                        onChange={(value) => setPrices(value)}
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