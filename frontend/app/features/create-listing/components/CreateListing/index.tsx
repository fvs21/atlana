import { useAtom } from "jotai"
import { listingCategoryAtom, stepAtom } from "../../store"
import { determineCreateListingStep } from "../../utils";

export default function CreateListing() {
    const [step] = useAtom(stepAtom);

    const [category] = useAtom(listingCategoryAtom);
    
    return determineCreateListingStep(step, category === "property_rentals");
}