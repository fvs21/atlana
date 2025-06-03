import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import { ChevronLeft } from "lucide-react";
import { useAtom } from "jotai";
import { airConditioningAtom, bathroomsAtom, bedroomsAtom, furnishedAtom, propertyTypeAtom, stepAtom } from "../../store";
import LabeledSelect from "~/components/labeled-select";
import { PropertyType } from "~/types/listings";
import { PropertyTypes } from "~/constants/property";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";

export default function PropertyInformationStep() {
    const [, setStep] = useAtom(stepAtom);

    const [propertyType, setPropertyType] = useAtom(propertyTypeAtom);
    const [bedrooms, setBedrooms] = useAtom(bedroomsAtom);
    const [bathrooms, setBathrooms] = useAtom(bathroomsAtom);
    const [airConditioning, setAirConditioning] = useAtom(airConditioningAtom);
    const [furnished, setFurnished] = useAtom(furnishedAtom);

    const next = () => {
        if(propertyType === "") 
            return;

        if(bedrooms === undefined)
            return;

        if(bathrooms === undefined)
            return;

        setStep(2);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(0)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={cn(styles.createListing)}>
                <h1 className={styles.createListingOneTitle}>
                    Información de la propiedad
                </h1>
                <div className={cn(styles.formInput, "mt-4")}>
                    <LabeledSelect
                        label="Tipo de propiedad"
                        placeholder="Selecciona el tipo de propiedad"
                        name="property_type"
                        value={propertyType}
                        onChange={(val) => setPropertyType(val as PropertyType)}
                        options={PropertyTypes.map((type) => ({
                            name: type.name,
                            value: type.value,
                        }))}
                    />
                </div>
                <div className={styles.formInput}>
                    <ValidatedInput
                        label="Número de habitaciones"
                        placeholder="Número de habitaciones"
                        name="bedrooms"
                        type="number"
                        value={bedrooms}
                        onChange={(val) => setBedrooms(parseInt(val))}
                    />
                </div>
                <div className={styles.formInput}>
                    <ValidatedInput
                        label="Número de baños"
                        placeholder="Número de baños"
                        name="bathrooms"
                        type="number"
                        value={bathrooms}
                        onChange={(val) => setBathrooms(parseInt(val))}
                    />
                </div>
                <div className={styles.formInput}>
                    <LabeledSelect
                        label="Aire acondicionado"
                        placeholder="Selecciona si la propiedad cuenta con aire acondicionado"
                        name="air_conditioning"
                        options={[
                            { name: "Sí", value: "true" },
                            { name: "No", value: "false" },
                        ]}
                        value={airConditioning == undefined ? "" : airConditioning ? "true" : "false"}
                        onChange={(val) => setAirConditioning(val === "true")}
                    />
                </div>
                <div className={styles.formInput}>
                    <LabeledSelect
                        label="Amueblado"
                        placeholder="Selecciona si la propiedad está amueblada"
                        name="furnished"
                        options={[
                            { name: "Sí", value: "true" },
                            { name: "No", value: "false" },
                        ]}
                        value={furnished == undefined ? "" : furnished ? "true" : "false"}
                        onChange={(val) => setFurnished(val === "true")}
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