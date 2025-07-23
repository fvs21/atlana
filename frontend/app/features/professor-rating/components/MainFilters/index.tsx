import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCourse, useSearch } from "../../store";
import { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command";
import { CourseQueryResult } from "../../types/rater";
import { useSearchCourse } from "../../api";

type FilterProps = {
    name: string;
    placeholder: string;
    children: React.ReactNode;
}

export default function MainFilters() {
    const [, setSearch] = useSearch();
    const [course, setCourse] = useCourse();

    const [tentativeCourse, setTentativeCourse] = useState<string>("");
    const [courseOptions, setCourseOptions] = useState<CourseQueryResult[]>([]);
    const { search: searchFn, isPending: courseSearchPending } = useSearchCourse();

    const resetFilters = () => {
        setSearch("");
        setCourse(null);
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(!tentativeCourse)
                return;

            const res = await searchFn(tentativeCourse);
            setCourseOptions(res || []);
        }, 300);

        return () => clearTimeout(timeout);
    }, [tentativeCourse]);

    return (
        <div className={styles.mainFiltersContainer}>
            <h1 className={styles.title}>
                Filtros
            </h1>
            <div className={styles.filters}>
                <Filter 
                    name="Materia"
                    placeholder={course ? course.name : "Materias"}
                >
                    <Command shouldFilter={false}>
                        <CommandInput onValueChange={(val) => setTentativeCourse(val)} placeholder="Nombre del curso"/>
                        {(tentativeCourse && !courseSearchPending) && (
                            <CommandEmpty>
                                No se encontró la materia que buscas
                            </CommandEmpty>
                        )}
                        <CommandGroup>
                            {courseOptions.map((crs) => (
                                <CommandItem 
                                    key={crs.id}
                                    onSelect={() => {
                                        setCourse({
                                            id: crs.id,
                                            name: crs.name
                                        });
                                    }}
                                >
                                    {crs.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </Filter>
                <Filter
                    name="Departamento"
                    placeholder="Departamentos"
                >
                    <Command>

                    </Command>
                </Filter>
                <Filter
                    name="Etiquetas"
                    placeholder="Etiquetas"
                >
                    <Command>

                    </Command>
                </Filter>
                <div className="mt-2 w-full">
                    <Button className={cn("primaryButton", styles.resetFiltersBtn)} onClick={resetFilters}>
                        Reiniciar filtros
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Filter({ name, placeholder, children }: FilterProps) {
    const [popover, setPopover] = useState<boolean>(false);

    return (
        <div className={styles.filter}>
            <h1>
                {name}
            </h1>
            <Popover open={popover} onOpenChange={setPopover}>
                <PopoverTrigger asChild>
                    <Button className={styles.filterBtn}>
                        {placeholder}
                        <ChevronDown />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    {children}
                </PopoverContent>
            </Popover>
        </div>
    )
}