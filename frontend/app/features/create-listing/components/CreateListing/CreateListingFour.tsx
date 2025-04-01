import { useAtom } from "jotai";
import { listingImagesAtom, stepAtom } from "../../store";
import styles from "./styles.module.scss";
import { ChevronLeft } from "lucide-react";
import ListingImagesInput from "../ListingImagesInput";

/**
 * Component for adding images to the listing
*/
export default function CreateListingFour() {
    const [, setStep] = useAtom(stepAtom);
    const [images, setImages] = useAtom(listingImagesAtom);

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(2)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={styles.createListing}>
                <h1 className={styles.createListingOneTitle}>
                    Agrega tus imagenes
                </h1>
                <div className="mt-4">
                    <ListingImagesInput />
                </div>
            </div>  
        </>
    )
}