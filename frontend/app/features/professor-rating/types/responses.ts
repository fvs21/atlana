import { Professor } from ".";

export type FetchProfessorsResponse = {
    professors: {
        count: number;
        next: string;
        previous: string;
        results: Professor[]
    }
}