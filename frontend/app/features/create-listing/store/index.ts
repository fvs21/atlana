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
const bedroomsAtom = atom<number>();
const bathroomsAtom = atom<number>();
const timeUnitAtom = atom<PropertyTimeUnit>("day");
const locationAtom = atom<Location>({
    latitude: 0,
    longitude: 0,
    radius: 0
});
const airConditioningAtom = atom<boolean>();
const furnishedAtom = atom<boolean>();


const useBody = (): CreateListingBody | CreatePropertyListingBody => {
    const [title] = useAtom(listingTitleAtom);
    const [description] = useAtom(listingDescriptionAtom);
    const [category] = useAtom(listingCategoryAtom);
    const [price] = useAtom(listingPriceAtom);
    const [images] = useAtom(listingImagesAtom);
    const [used] = useAtom(listingUsedAtom);

    const [property_type] = useAtom(propertyTypeAtom);
    const [bedrooms] = useAtom(bedroomsAtom);
    const [bathrooms] = useAtom(bathroomsAtom);
    const [location] = useAtom(locationAtom);
    const [time_unit] = useAtom(timeUnitAtom);
    const [air_conditioning] = useAtom(airConditioningAtom);
    const [furnished] = useAtom(furnishedAtom);

    if (category != "property_rentals") {
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
        location: {
            latitude: location.latitude,
            longitude: location.longitude,
            radius: location.radius
        },
        property_type,
        bedrooms: bedrooms as number,
        bathrooms: bathrooms as number,
        time_unit,
        air_conditioning,
        furnished,
    }
}

const useResetBody = () => {
    const [, setTitle] = useAtom(listingTitleAtom);
    const [, setDescription] = useAtom(listingDescriptionAtom);
    const [, setCategory] = useAtom(listingCategoryAtom);
    const [, setImages] = useAtom(listingImagesAtom);
    const [, setPrice] = useAtom(listingPriceAtom);
    const [, setUsed] = useAtom(listingUsedAtom);
    const [, setPropertyType] = useAtom(propertyTypeAtom);
    const [, setBedrooms] = useAtom(bedroomsAtom);
    const [, setBathrooms] = useAtom(bathroomsAtom);
    const [, setLocation] = useAtom(locationAtom);
    const [, setTimeUnit] = useAtom(timeUnitAtom);
    const [, setAirConditioning] = useAtom(airConditioningAtom);
    const [, setFurnished] = useAtom(furnishedAtom);

    return () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setImages([]);
        setPrice(undefined);
        setUsed(false);
        setPropertyType("");
        setBedrooms(undefined);
        setBathrooms(undefined);
        setLocation({
            latitude: 0,
            longitude: 0,
            radius: 0
        });
        setTimeUnit("day");
        setAirConditioning(false);
        setFurnished(false);
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
    airConditioningAtom,
    furnishedAtom,
    propertyTypeAtom,
    bedroomsAtom,
    bathroomsAtom,
    locationAtom,
    timeUnitAtom,
    useBody,
    useResetBody
}