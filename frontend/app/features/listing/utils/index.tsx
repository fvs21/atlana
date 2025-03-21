import CreateListingOne from "../components/CreateListing/CreateListingOne";
import CreateListingTwo from "../components/CreateListing/CreateListingTwo";

export function determineCreateListingStep(step: number) {
    switch(step) {
        case 0:
            return <CreateListingOne />;
        case 1:
            return <CreateListingTwo />
        
    }
}