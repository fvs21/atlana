import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { Professor } from "../types";

export function useFetchProfessors() {
    const { data: professors, isLoading } = useQuery({
        queryKey: ['professors'],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ professors: Professor[] }>>("/rating/professor");
            return res.data.data?.professors;
        },
        retry: 1
    });

    return { 
        professors,
        isLoading
    }
}

export function useCreateProfessor() {

    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async ({ name, department }: { name: string, department: string }) => {
            const res = await api.post<ResponseBody<{ professor: Professor }>>("/rating/professor", {
                name,
                department
            });
            
            return res.data.data;
        }
    });

    return {
        create, isPending, createDisabled: isPending && !isError
    }
}