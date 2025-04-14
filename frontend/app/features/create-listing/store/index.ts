import { atom, useAtom } from "jotai";
import { CreateListingPrice, CustomOptions } from "../types";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");
const listingCategoryAtom = atom<string>("");
const listingCustomizableAtom = atom<boolean>(false);
const listingPricesAtom = atom<CreateListingPrice[]>([{}]);
const listingCustomOptionsAtom = atom<CustomOptions>({});
const listingColorOptionsImagesAtom = atom<File[]>([]);
const listingImagesAtom = atom<File[]>([]);

const useBody = () => {
    const [title] = useAtom(listingTitleAtom);
    const [description] = useAtom(listingDescriptionAtom);
    const [category] = useAtom(listingCategoryAtom);
    const [customizable] = useAtom(listingCustomizableAtom);
    const [prices] = useAtom(listingPricesAtom);
    const [custom_options] = useAtom(listingCustomOptionsAtom);
    const [images] = useAtom(listingImagesAtom);
    const [color_images] = useAtom(listingColorOptionsImagesAtom);

    return {
        title,
        description,
        category,
        prices,
        custom_options,
        images,
        color_images,
    }
}

export {
    stepAtom,
    listingTitleAtom,
    listingDescriptionAtom,
    listingPricesAtom,
    listingCategoryAtom,
    listingCustomizableAtom,
    listingCustomOptionsAtom,
    listingColorOptionsImagesAtom,
    listingImagesAtom,
    useBody
}