import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { locationAtom, stepAtom } from "../../store";
import { ClientOnly } from "remix-utils/client-only";
import ChooseLocationMap from "../ChooseLocationMap/index.client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

export default function PropertyLocationStep() {
    const [, setStep] = useAtom(stepAtom);

    const [location, setLocation] = useAtom(locationAtom);

    const next = () => {
        if(!location.latitude || !location.longitude || !location.radius)
            return;

        setStep(3);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(1)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={styles.createListing}>
                <h1 className={styles.createListingOneTitle}>
                    Ubicación de la propiedad
                </h1>
                <div className={styles.description}>
                    Selecciona la ubicación de la propiedad en el mapa. Puedes
                    buscar por dirección y/o seleccionar un punto en el mapa.
                </div>
                <div>
                    <ClientOnly>
                        {() => <ChooseLocationMap
                            location={location}
                            setLocation={setLocation}
                        />} 
                    </ClientOnly>
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