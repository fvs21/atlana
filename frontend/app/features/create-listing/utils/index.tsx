import ListingImagesStep from "../components/CreateListing/ListingImagesStep";
import ListingPriceStep from "../components/CreateListing/ListingPriceStep";
import MainListingInfoStep from "../components/CreateListing/MainListingInfoStep";
import PropertyInformationStep from "../components/CreateListing/PropertyInformationStep";
import PropertyLocationStep from "../components/CreateListing/PropertyLocationStep";

export function determineCreateListingStep(step: number, is_property: boolean) {
    if (!step) 
        return <MainListingInfoStep />;

    if (is_property) {
        return determinePropertyListingStep(step);
    } else {
        return determineGeneralListingStep(step);
    }
}

function determinePropertyListingStep(step: number) {    
    switch (step) {
        case 1:
            return <PropertyInformationStep />;
        case 2:
            return <PropertyLocationStep />;
        case 3:
            return <ListingPriceStep />;
        case 4:
            return <ListingImagesStep />;
    }
}

function determineGeneralListingStep(step: number) {
    switch (step) {
        case 1:
            return <ListingPriceStep />;
        case 2:
            return <ListingImagesStep />;
    }
}