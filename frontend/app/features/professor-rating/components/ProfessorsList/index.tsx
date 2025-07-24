import { ScrollArea } from "~/components/ui/scroll-area";
import { useProfessors } from "../../api";
import ProfessorsListItem from "../ProfessorListItem";
import styles from "./styles.module.scss";
import { useCourse, useDepartment, useSearch, useTags } from "../../store";
import LoadingScreen from "~/components/loading-screen";

export default function ProfessorsList() {
    const [search] = useSearch();
    const [course] = useCourse();
    const [department] = useDepartment();
    const [tags] = useTags();

    const { data, isLoading, hasNextPage } = useProfessors({
        professor_name: search,
        course: course || undefined,
        department: department || undefined,
        tags: tags
    });

    return (
        <div className={styles.professorsListContainer}>
            {isLoading ? (
                <LoadingScreen />
            ) : (
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
            )}
        </div>
    )
}