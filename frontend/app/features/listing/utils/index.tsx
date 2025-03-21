import CreateListingOne from "../components/CreateListing/CreateListingOne";

export function determineCreateListingStep(step: number) {
    switch(step) {
        case 0:
            return <CreateListingOne />;
        
    }
}