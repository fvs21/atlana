import { Loader } from "lucide-react";
import { useProfessors } from "../../api";
import styles from "./styles.module.scss";

export default function ProfessorsList() {
    const { data, isLoading } = useProfessors();

    if(isLoading)
        return <div className={styles.professorsListContainer} />   

    return (
        <div className={styles.professorsListContainer}>
            {data?.pages.map((page) => (
                page.results.map((prof) => {
                    return (
                        <div>
                            {prof.name}
                        </div>
                    )
                })
            ))}
        </div>
    )
}