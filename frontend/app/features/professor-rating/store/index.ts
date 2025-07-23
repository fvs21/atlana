import { atom, useAtom } from "jotai";

const searchAtom = atom<string>("");

const useSearch = () => {
    return useAtom(searchAtom);
}

export {
    searchAtom,
    useSearch
}