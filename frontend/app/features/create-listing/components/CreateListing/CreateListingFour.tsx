import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingPricesAtom, stepAtom } from "../../store";
import ListingPriceInput from "../ListingPriceInput";

export default function CreateListingFour() {
    const [, setStep] = useAtom(stepAtom);

    const [prices, setPrices] = useAtom(listingPricesAtom);

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
            </div>
        </>
    )
}