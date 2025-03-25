import { atom } from "jotai";
import { CreateListingPrice, CustomOptions } from "../types";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");
const listingCategoryAtom = atom<string>("");
const listingCustomizableAtom = atom<boolean>(false);
const listingPricesAtom = atom<CreateListingPrice[]>([{}]);
const listingCustomOptionsAtom = atom<CustomOptions>({});

export {
    stepAtom,
    listingTitleAtom,
    listingDescriptionAtom,
    listingPricesAtom,
    listingCategoryAtom,
    listingCustomizableAtom,
    listingCustomOptionsAtom
}