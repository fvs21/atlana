import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "~/api";
import { ResponseBody } from "~/types/globals";
import { BasicProfessorInfo, Professor, Rating } from "../types";
import { CourseQueryResult, NewRating } from "../types/rater";
import { FetchProfessorsResponse } from "../types/responses";
import { formatProfessorQueryParams } from "../utils";
import { Course, Department } from "../types/filters";

type ProfessorFilters = {
    professor_name: string;
    course?: Course;
    department?: Department;
    tags: { name: string; value: string }[];
}

export function useProfessors({ professor_name, course, department, tags }: ProfessorFilters) {
    const queryParams = formatProfessorQueryParams(professor_name=professor_name, course=course, department=department, tags=tags);

    const { 
        data, 
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
    } = useInfiniteQuery({
        queryKey: ['professors', professor_name, course?.id, department?.value, ...(tags.map(t => t.value))],
        queryFn: async ({ pageParam }) => {
            const res = await api.get<ResponseBody<FetchProfessorsResponse>>(pageParam);
            const prof = res.data.data?.professors!;

            return prof;
        },
        initialPageParam: "/rating/professor?" + queryParams,
        getPreviousPageParam: (firstPage) => firstPage.previous,
        getNextPageParam: (lastPage) => lastPage.next
    });

    return {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status
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

type ProfessorResponse = {
    professor: Professor;
    ratings: {
        count: number;
        list: Rating[];
    }
}
export function useProfessor(id: number) {
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['professor', id],
        queryFn: async () => {
            const res = await api.get<ResponseBody<ProfessorResponse>>("/rating/professor/" + id);

            queryClient.setQueryData(['professor-info', id], res.data.data?.professor);
            
            return res.data.data;
        }
    });

    return {
        professor: data?.professor,
        ratings: data?.ratings,
        isLoading,
        isError
    }
}

export function useProfessorName(id: number) {
    const { data: professor, isLoading, isError } = useQuery({
        queryKey: ['professor-info', id],
        queryFn: async () => {
            const res = await api.get<ResponseBody<{ professor: BasicProfessorInfo }>>("/rating/professor/basic/" + id);
            return res.data.data?.professor;
        }
    });

    return {
        professor,
        isLoading,
        isError
    }
}

export function useCreateRating() {
    const { mutateAsync: create, isPending, isError } = useMutation({
        mutationFn: async ({ data, professorId }: { data: NewRating, professorId: number }) => {
            const res = await api.post("/rating/professor/" + professorId, {
                comment: data.comment,
                course: data.course,
                mandatory_assistance: data.assistanceMandatory,
                recommended: data.recommended,
                quality: data.quality,
                difficulty: data.difficulty,
                tags: data.tags,
                grade_achieved: data.grade
            });
        }
    });

    return {
        create,
        isPending,
        createDisabled: isPending && !isError
    }
}

export function useSearchCourse() {
    const queryClient = useQueryClient();

    const { mutateAsync: search, isPending } = useMutation({
        mutationFn: async (name: string) => {
            const res = await api.get<ResponseBody<{ courses: CourseQueryResult[] }>>("/rating/search/courses?q=" + name);

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

export function useSearchProfessors() {
    const { mutateAsync: search, isPending } = useMutation({
        mutationFn: async (name: string) => {
            const res = await api.get<ResponseBody<{ professors: Omit<Professor, "tags">[] }>>("/rating/search/professors?q=" + name);

            return res.data.data?.professors;
        }
    });

    return {
        search,
        isPending
    }
}