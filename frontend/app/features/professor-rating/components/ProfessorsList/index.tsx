import { ScrollArea } from "~/components/ui/scroll-area";
import { useProfessors } from "../../api";
import ProfessorsListItem from "../ProfessorListItem";
import styles from "./styles.module.scss";

export default function ProfessorsList() {
    const { data, isLoading, hasNextPage } = useProfessors();

    if (isLoading)
        return <div className={styles.professorsListContainer} />

    return (
        <div className={styles.professorsListContainer}>
            <ScrollArea className="h-full">
                {data?.pages.map((page) => (
                    page.results.map((prof) => {
                        return (
                            <ProfessorsListItem
                                key={prof.id}
                                professor={prof}
                            />
                        )
                    })
                ))}
            </ScrollArea>
        </div>
    )
}