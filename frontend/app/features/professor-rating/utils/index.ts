import dayjs from "dayjs";

export function filterProfessorNames(input: string, professors: { name: string, id: number }[]) {
    return professors.filter(prof => normalizeInput(prof.name).includes(normalizeInput(input)));
}

function normalizeInput(input: string) {
   return input.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').toLowerCase(); 
}

export function formatRatingCreatedAt(date: string): string {
    return dayjs(date).format('DD/MM/YYYY');
}