import { atom } from "jotai";
import { CreateListingPrice } from "../types";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");
const listingPricesAtom = atom<CreateListingPrice[]>([]);

export {
    stepAtom,
    listingTitleAtom,
    listingDescriptionAtom,
    listingPricesAtom
}