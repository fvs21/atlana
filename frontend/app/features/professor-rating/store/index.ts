import { atom, useAtom } from "jotai";
import { Course } from "../types/filters";

const searchAtom = atom<string>("");
const courseAtom = atom<Course | null>();

const useSearch = () => {
    return useAtom(searchAtom);
}

const useCourse = () => {
    return useAtom(courseAtom);
}

export {
    searchAtom,
    useSearch,
    useCourse
}