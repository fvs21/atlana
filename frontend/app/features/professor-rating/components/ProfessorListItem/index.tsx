import { Link } from "@remix-run/react";
import { Professor } from "../../types";
import styles from "./styles.module.scss";
import getProfessorEmoji from "../../utils/emoji";

export default function ProfessorsListItem({ professor }: { professor: Professor }) {
    return (
        <Link className={styles.professorListItem} to={"/rating/professor/" + professor.id}>
            <div className="flex items-center gap-4">
                <span className="text-2xl">{getProfessorEmoji(professor.average_rating * 2)}</span>
                {professor.name}
            </div>
            <div>
                {parseFloat((professor.average_rating * 2).toFixed(2))}/10
            </div>
        </Link>
    )
}