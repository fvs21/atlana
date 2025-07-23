import { Popover, PopoverTrigger } from "~/components/ui/popover";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

type FilterProps = {
    name: string;
    placeholder: string;
    options: string[] | number[];
    onClick: (option: string | number) => void;
}

export default function MainFilters() {
    return (
        <div className={styles.mainFiltersContainer}>
            <h1 className={styles.title}>
                Filtros
            </h1>
            <div className={styles.filters}>
                <Filter 
                    name="Materia"
                    placeholder="Materias"
                    options={[]}
                    onClick={() => {}}
                />
                <Filter
                    name="Departamento"
                    placeholder="Departamentos"
                    options={[]}
                    onClick={() => {}}
                />
                <Filter
                    name="Etiquetas"
                    placeholder="Etiquetas"
                    options={[]}
                    onClick={() => {}}
                />
                <div className="mt-2 w-full">
                    <Button className={cn("primaryButton", styles.resetFiltersBtn)}>
                        Reiniciar filtros
                    </Button>
                </div>
            </div>
        </div>
    )
}

function Filter({ name, options, onClick }: FilterProps) {
    return (
        <div className={styles.filter}>
            <h1>
                {name}
            </h1>
            <Popover open={false}>
                <PopoverTrigger asChild>
                    <Button className={styles.filterBtn}>
                        Materias
                        <ChevronDown />
                    </Button>
                </PopoverTrigger>
            </Popover>
        </div>
    )
}