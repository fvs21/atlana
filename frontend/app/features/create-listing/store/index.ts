import { atom, useAtom } from "jotai";
import { Category, PropertyType } from "~/types/listings";
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
const aproximateLocationAtom = atom<boolean>(true);
const bedroomsAtom = atom<number>();
const bathroomsAtom = atom<number>();
const locationAtom = atom<Location>({
    latitude: 0,
    longitude: 0,
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
    const [aproximate_location] = useAtom(aproximateLocationAtom);
    const [bedrooms] = useAtom(bedroomsAtom);
    const [bathrooms] = useAtom(bathroomsAtom);
    const [location] = useAtom(locationAtom);

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
        aproximate_location,
        location: {
            latitude: location.latitude,
            longitude: location.longitude
        },
        property_type,
        bedrooms,
        bathrooms
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
    aproximateLocationAtom,
    bedroomsAtom,
    bathroomsAtom,
    locationAtom,
    useBody
}