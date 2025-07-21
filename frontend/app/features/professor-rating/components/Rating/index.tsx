import { cn } from "~/lib/utils";
import { Rating as RatingType } from "../../types";
import styles from "./styles.module.scss";
import { Laptop } from "lucide-react";
import Tag from "../Tag";
import { formatRatingCreatedAt } from "../../utils";

const qualityStyles = [
    styles.averageVeryBad,
    styles.averageBad,
    styles.averageMedium,
    styles.averageGood,
    styles.averageVeryGood
]

const difficultyStyles = [
    styles.averageVeryGood,
    styles.averageGood,
    styles.averageMedium,
    styles.averageBad,
    styles.averageVeryBad,
]

export default function Rating({ rating }: { rating: RatingType }) {
    return (
        <div className={styles.rating}>
            <div className={styles.averages}>

                <div className={styles.average}>
                    <div className={cn(styles.averageBox, qualityStyles[rating.quality - 1])}>
                        {rating.quality * 2}
                    </div>
                    <span className={cn("text-sm font-medium", qualityStyles[rating.quality - 1])}>Calidad</span>
                </div>
                <div className={styles.average}>
                    <div className={cn(styles.averageBox, difficultyStyles[rating.difficulty - 1])}>
                        {rating.difficulty * 2}
                    </div>
                    <span className={cn("text-sm font-medium", difficultyStyles[rating.difficulty - 1])}>Dificultad</span>
                </div>
            </div>
            <div className={styles.information}>
                <div className={styles.header}>
                    <h1 className={styles.courseName}>
                        <Laptop />
                        {rating.course}
                    </h1>
                    <div className={styles.createdAt}>
                        {formatRatingCreatedAt(rating.created_at)}
                    </div>
                </div>
                <div className={styles.characteristics}>
                    <div className={styles.characteristic}>
                        <span>Asistencia:</span> {rating.mandatory_assistance ? "Obligatoria" : "No obligatoria"}
                    </div>
                    <div className={styles.characteristic}>
                        <span>Lo recomiendo:</span> {rating.recommended ? "Si" : "No"}
                    </div>
                    <div className={styles.characteristic}>
                        <span>Calificación obtenida:</span> {rating.grade_achieved}
                    </div>
                </div>
                <div className={styles.comment}>
                    {rating.comment}
                </div>
                <div className={styles.tags}>
                    {rating.tags.map((tag) => {
                        return (
                            <Tag title={tag.title} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}