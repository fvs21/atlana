import { atom, useAtom } from "jotai";
import { CreateListingPrice, CustomOptions } from "../types";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");
const listingCategoryAtom = atom<string>("");
const listingCustomizableAtom = atom<boolean>(false);
const listingPricesAtom = atom<CreateListingPrice[]>([{}]);
const listingCustomOptionsAtom = atom<CustomOptions>({});
const listingImagesAtom = atom<File[]>([]);

const useBody = () => {
    const [title] = useAtom(listingTitleAtom);
    const [description] = useAtom(listingDescriptionAtom);
    const [category] = useAtom(listingCategoryAtom);
    const [customizable] = useAtom(listingCustomizableAtom);
    const [prices] = useAtom(listingPricesAtom);
    const [customOptions] = useAtom(listingCustomOptionsAtom);
    const [images] = useAtom(listingImagesAtom);

    return {
        title,
        description,
        category,
        customizable,
        prices,
        customOptions,
        images
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
    listingImagesAtom,
    useBody
}