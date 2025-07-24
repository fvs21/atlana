import { atom, useAtom } from "jotai";
import { Course, Department } from "../types/filters";

const searchAtom = atom<string>("");
const courseAtom = atom<Course | null>();
const departmentAtom = atom<Department | null>();
const tagsAtom = atom<{ value: string, name: string }[]>([]);

const useSearch = () => {
    return useAtom(searchAtom);
}

const useCourse = () => {
    return useAtom(courseAtom);
}

const useDepartment = () => {
    return useAtom(departmentAtom);
}

const useTags = () => {
    return useAtom(tagsAtom);
}

export {
    searchAtom,
    courseAtom,
    departmentAtom,
    tagsAtom,
    useSearch,
    useCourse,
    useDepartment,
    useTags
}