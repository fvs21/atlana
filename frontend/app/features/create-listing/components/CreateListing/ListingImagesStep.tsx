import { useAtom } from "jotai";
import { listingImagesAtom, stepAtom, useBody } from "../../store";
import styles from "./styles.module.scss";
import { ChevronLeft } from "lucide-react";
import ListingImagesInput from "../ListingImagesInput";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { useCreateListing, useCreatePropertyListing } from "../../api";
import { useNavigate } from "@remix-run/react";
import { CreateListingBody, CreatePropertyListingBody } from "../../types";

/**
 * Component for adding images to the listing
*/
export default function ListingImagesStep() {
    const [step, setStep] = useAtom(stepAtom);
    const [images] = useAtom(listingImagesAtom);

    const { create, isPending, createDisabled } = useCreateListing();
    const { create: createProperty } = useCreatePropertyListing();

    const body = useBody();
    const navigate = useNavigate();

    const next = async () => {
        if(images.length < 1) {
            toast.error("Debes agregar al menos 1 imágen");
            return;
        }        

        if(body.category == "property_rentals")
            createProperyListing();
        else 
            createListing();
        
    }

    const createListing = async () => {
        const formData = new FormData();

        const listingBody = body as CreateListingBody;

        listingBody.images.forEach((image) => {
            formData.append("images", image);
        });


        formData.append("data", JSON.stringify({
            title: listingBody.title,
            description: listingBody.description,
            category: listingBody.category,
            price: listingBody.price,
        }));

        try {
            await create(formData);
            navigate("/marketplace")
        } catch(error) {
            console.log(error);     
        }
    }

    const createProperyListing = async () => {
        const listingBody = body as CreatePropertyListingBody;
        const formData = new FormData();

        body.images.forEach((image) => {
            formData.append("images", image);
        });

        formData.append("data", JSON.stringify({
            title: listingBody.title,
            description: listingBody.description,
            category: listingBody.category,
            price: listingBody.price,
            property_type: listingBody.property_type,
            bedrooms: listingBody.bedrooms,
            bathrooms: listingBody.bathrooms,
            location: listingBody.location,
        }));

        try {
            await createProperty(formData);
            navigate("/marketplace")
        } catch(error) {
            console.log(error);     
        }
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(step-1)}>
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
                            Estas son las imagenes que se mostraran en el apartado principal de tu anuncio. Puedes agregar hasta 6 imagenes.
                        </div>
                    </div>
                    <Button className="primaryButton" onClick={next} disabled={createDisabled}>
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