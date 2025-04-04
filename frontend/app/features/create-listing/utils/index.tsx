import CreateListingFive from "../components/CreateListing/CreateListingFive";
import CreateListingFour from "../components/CreateListing/CreateListingFour";
import CreateListingOne from "../components/CreateListing/CreateListingOne";
import CreateListingThree from "../components/CreateListing/CreateListingThree";
import CreateListingTwo from "../components/CreateListing/CreateListingTwo";

export function determineCreateListingStep(step: number) {
    switch(step) {
        case 0:
            return <CreateListingOne />;
        case 1:
            return <CreateListingTwo />;
        case 2: 
            return <CreateListingThree />;
        case 3:
            return <CreateListingFour />;
        case 4:
            return <CreateListingFive />;
    }
}