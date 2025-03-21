import { atom } from "jotai";

const stepAtom = atom<number>(0);
const listingTitleAtom = atom<string>("");
const listingDescriptionAtom = atom<string>("");

export {
    stepAtom,
    listingTitleAtom,
    listingDescriptionAtom
}