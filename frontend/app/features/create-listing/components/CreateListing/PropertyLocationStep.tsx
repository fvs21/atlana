import { ChevronLeft } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { stepAtom } from "../../store";
import { ClientOnly } from "remix-utils/client-only";
import ChooseLocationMap from "../ChooseLocationMap/index.client";

export default function PropertyLocationStep() {
    const [, setStep] = useAtom(stepAtom);

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
                <div>
                    <ClientOnly>
                        {() => <ChooseLocationMap />}
                    </ClientOnly>
                </div> 
            </div>
        </>
    )
}