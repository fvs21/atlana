import { useAtom } from "jotai";
import { listingImagesAtom, stepAtom } from "../../store";
import styles from "./styles.module.scss";
import { ChevronLeft } from "lucide-react";
import ListingImagesInput from "../ListingImagesInput";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";

/**
 * Component for adding images to the listing
*/
export default function CreateListingFive() {
    const [, setStep] = useAtom(stepAtom);
    const [images] = useAtom(listingImagesAtom);

    const next = () => {
        if(images.length < 4) {
            toast.error("Debes agregar al menos 4 imágenes");
            return;
        }

        setStep(5);
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(4)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={cn(styles.createListing, styles.createListingFour)}>
                <div className={styles.createListingFourTitleContainer}>
                    <div>
                        <h1 className={styles.createListingOneTitle}>
                            Agrega tus imagenes
                        </h1>
                        <div className={styles.description}>
                            Estas son las imagenes que se mostraran en el apartado principal de tu anuncio. Puedes agregar hasta 10 imagenes.
                        </div>
                    </div>
                    <Button className="primaryButton" onClick={next}>
                        Crear
                    </Button>
                </div>
                <div className="mt-4">
                    <ListingImagesInput />
                </div>
            </div>  
        </>
    )
}