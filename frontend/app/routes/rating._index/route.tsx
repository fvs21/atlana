import MainFilters from "~/features/professor-rating/components/MainFilters";
import styles from "./styles.module.scss";
import Searchbar from "~/features/professor-rating/components/Searchbar";
import ProfessorsList from "~/features/professor-rating/components/ProfessorsList";

export default function Page() {
    return (
        <div className={styles.professorRatingContainer}>
            <MainFilters />
            <div className={styles.professorsListAndSearchContainer}>
                <Searchbar />
                <ProfessorsList />
            </div>
        </div>
    )
}