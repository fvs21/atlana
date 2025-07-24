import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { ChevronDown, Tags } from "lucide-react";
import { cn } from "~/lib/utils";
import { useCourse, useDepartment, useSearch, useTags } from "../../store";
import { useEffect, useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "~/components/ui/command";
import { CourseQueryResult } from "../../types/rater";
import { useSearchCourse } from "../../api";
import { DEPARTMENTS, TAGS } from "../../constants";

type FilterProps = {
    name: string;
    placeholder: string;
    children: React.ReactNode;
    active: boolean;
}

export default function MainFilters() {
    const [, setSearch] = useSearch();
    const [course, setCourse] = useCourse();
    const [department, setDepartment] = useDepartment();
    const [tags, setTags] = useTags();

    const tagValues = tags.map(t => t.value);

    const [tentativeCourse, setTentativeCourse] = useState<string>("");
    const [courseOptions, setCourseOptions] = useState<CourseQueryResult[]>([]);
    const { search: searchFn, isPending: courseSearchPending } = useSearchCourse();

    const resetFilters = () => {
        setSearch("");
        setCourse(null);
        setDepartment(null);
        setTags([]);
    }

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if (!tentativeCourse)
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
                    active={!!course}
                >
                    <Command shouldFilter={false}>
                        <CommandInput onValueChange={(val) => setTentativeCourse(val)} placeholder="Nombre del curso" />
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
                    placeholder={department?.name || "Departamentos"}
                    active={!!department}
                >
                    <Command>
                        <CommandGroup>
                            {DEPARTMENTS.map((dep) => (
                                <CommandItem
                                    key={dep.value}
                                    onSelect={() => {
                                        setDepartment(dep);
                                    }}
                                >
                                    {dep.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </Filter>
                <Filter
                    name="Etiquetas"
                    placeholder={tags.length ? tags.map(t => t.name).reduce((ac, cur) => ac + ", " + cur) : "Etiquetas"}
                    active={!!tags.length}
                >
                    <Command>
                        <CommandInput />
                        <CommandGroup>
                            {Object.entries(TAGS).map((tag) => (
                                <CommandItem
                                    className={tagValues.includes(tag[0]) ? "bg-gray-200" : ""}
                                    key={tag[0]}
                                    onSelect={() => {
                                        if (tagValues.includes(tag[0])) {
                                            const tagsCopy = [...tags];
                                            const index = tags.findIndex(t => t.value == tag[0]);
                                            tagsCopy.splice(index, 1);
                                            setTags(tagsCopy);
                                        } else {
                                            setTags([...tags, {
                                                name: tag[1],
                                                value: tag[0]
                                            }]);
                                        }
                                    }}
                                >
                                    {tag[1]}
                                </CommandItem>
                            ))}
                        </CommandGroup>
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

function Filter({ name, placeholder, active, children }: FilterProps) {
    const [popover, setPopover] = useState<boolean>(false);

    return (
        <div className={styles.filter}>
            <h1>
                {name}
            </h1>
            <Popover open={popover} onOpenChange={setPopover}>
                <PopoverTrigger asChild>
                    <Button className={cn(styles.filterBtn, active ? styles.filterBtnActive : "", "overflow-x-hidden")}>
                        {placeholder}
                        <ChevronDown />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 overflow-y-auto max-h-[300px]">
                    {children}
                </PopoverContent>
            </Popover>
        </div>
    )
}