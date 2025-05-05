import { atom, useAtom } from "jotai";
import { Category, PropertyTimeUnit, PropertyType } from "~/types/listings";
import { CreateListingBody, CreatePropertyListingBody } from "../types";
import { Location } from "~/types/location";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");
const listingCategoryAtom = atom<Category>("");
const listingImagesAtom = atom<File[]>([]);
const listingPriceAtom = atom<number>();
const listingUsedAtom = atom<boolean>(false);

//property listings
const propertyTypeAtom = atom<PropertyType>("");
const sellAtom = atom<boolean>(false);
const bedroomsAtom = atom<number>();
const bathroomsAtom = atom<number>();
const timeUnitAtom = atom<PropertyTimeUnit>("day");
const locationAtom = atom<Location>({
    latitude: 0,
    longitude: 0,
    radius: 0
});


const useBody = (): CreateListingBody | CreatePropertyListingBody => {
    const [title] = useAtom(listingTitleAtom);
    const [description] = useAtom(listingDescriptionAtom);
    const [category] = useAtom(listingCategoryAtom);
    const [price] = useAtom(listingPriceAtom);
    const [images] = useAtom(listingImagesAtom);
    const [used] = useAtom(listingUsedAtom);

    const [property_type] = useAtom(propertyTypeAtom);
    const [sell] = useAtom(sellAtom);
    const [bedrooms] = useAtom(bedroomsAtom);
    const [bathrooms] = useAtom(bathroomsAtom);
    const [location] = useAtom(locationAtom);
    const [time_unit] = useAtom(timeUnitAtom);

    if(category != "property_rentals") {
        return {
            title,
            description,
            category,
            price: price || 0,
            images,
            used,
        }
    }

    return {
        title,
        description,
        category,
        price: price || 0,
        images,
        used,
        sell,
        location: {
            latitude: location.latitude,
            longitude: location.longitude,
            radius: location.radius
        },
        property_type,
        bedrooms: bedrooms as number,
        bathrooms: bathrooms as number,
        time_unit,
    }
}

export {
    stepAtom,
    listingTitleAtom,
    listingDescriptionAtom,
    listingCategoryAtom,
    listingImagesAtom,
    listingPriceAtom,
    listingUsedAtom,
    propertyTypeAtom,
    sellAtom,
    bedroomsAtom,
    bathroomsAtom,
    locationAtom,
    timeUnitAtom,
    useBody
}