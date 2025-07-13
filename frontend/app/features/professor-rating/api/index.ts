import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Professor } from "../types";
import { CourseQueryResult, NewRating } from "../types/rater";

function addProfessorsToCache(professors: Professor[]) {
    const queryClient = useQueryClient();

    professors.forEach(prof => {
        queryClient.setQueryData(['professor', prof.id], prof);
    })
}

export function useFetchProfessors() {
    const { data: professors, isLoading } = useQuery({
        queryKey: ['professors'],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ professors: Professor[] }>>("/rating/professor");

            addProfessorsToCache(res.data.data?.professors!);

            return res.data.data?.professors;
        },
        retry: 1,
    });

    return { 
        professors,
        isLoading
    }
}

export function useCreateProfessor() {
    const queryClient = useQueryClient();

    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async ({ name, department }: { name: string, department: string }) => {
            const res = await api.post<ResponseBody<{ professor: Professor }>>("/rating/professor", {
                name,
                department
            });
            
            return res.data.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['professor', data?.professor.id], data?.professor);
        }
    });

    return {
        create, isPending, createDisabled: isPending && !isError
    }
}

export function useProfessor(id: number) {
    const { data: professor, isLoading } = useQuery({
        queryKey: ['professor', id],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ professor: Professor }>>("/rating/professor/" + id);
            return res.data.data?.professor;
        }
    });

    return {
        professor,
        isLoading
    }
}

export function useCreateRating() {
    const { mutateAsync: create, isPending } = useMutation({
        mutationFn: async ({ data, professorId }: { data: NewRating, professorId: number }) => {
            const res = await api.post("/rating/professor/" + professorId, {

            });
        }
    })
}

export function useSearchCourse() {
    const queryClient = useQueryClient();

    const { mutateAsync: search, isPending } = useMutation({
        mutationFn: async (name: string) => {
            const res = await api.get<ResponseBody<{ courses: CourseQueryResult[] }>>("/rating/courses?q=" + name);

            const courses = res.data.data?.courses;
            
            queryClient.setQueryData(['courses', name], courses);

            return courses;
        },
    });

    return {
        search,
        isPending
    }
}