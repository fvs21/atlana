import dayjs from "dayjs";
import { Course, Department } from "../types/filters";

export function filterProfessorNames(input: string, professors: { name: string, id: number }[]) {
    console.log(input);
    
    return professors.filter(prof => normalizeInput(prof.name).includes(normalizeInput(input)));
}

function normalizeInput(input: string) {
   return input.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase(); 
}

export function formatRatingCreatedAt(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
}

export function formatProfessorQueryParams(name?: string, course?: Course, department?: Department, tags?: { name: string; value: string }[]) {
    const params = new URLSearchParams();

    if(name)
        params.append("name", name);

    if(course)
        params.append("course", course.id.toString());

    if(department)
        params.append("department", department.value);

    if(tags && tags.length)
        tags.forEach((tag) => params.append('tag', tag.value));

    return params.toString();
}