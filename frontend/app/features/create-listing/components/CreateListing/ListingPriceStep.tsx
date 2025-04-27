import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCategoryAtom, listingPriceAtom, stepAtom, timeUnitAtom } from "../../store";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import ValidatedInput from "~/components/validated-input";
import LabeledSelect from "~/components/labeled-select";
import { PropertyTimeUnit } from "~/types/listings";

export default function ListingPriceStep() {
    const [step, setStep] = useAtom(stepAtom);

    const [price, setPrice] = useAtom(listingPriceAtom);    
    const [category] = useAtom(listingCategoryAtom);

    const isProperty = category === "property_rentals";
    const [propertyTimeUnit, setPropertyTimeUnit] = useAtom(timeUnitAtom);

    const next = () => {
        if(isProperty && !propertyTimeUnit) 
            return;
            
        if(!price)
            return;
        
        setStep(step+1);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(step-1)}>
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
                {isProperty && (
                    <div className={styles.formInput}>
                        <LabeledSelect 
                            name="propertyTimeUnit"
                            label="Al"
                            placeholder=""
                            value={propertyTimeUnit}
                            onChange={(val) => setPropertyTimeUnit(val as PropertyTimeUnit)}
                            options={[
                                { value: "day", name: "Día" },
                                { value: "week", name: "Semana" },
                                { value: "month", name: "Mes" },
                            ]}
                        />
                    </div>
                )}
                <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                    <Button className="primaryButton" onClick={next}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    )
}