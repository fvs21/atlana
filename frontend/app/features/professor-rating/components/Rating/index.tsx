import { cn } from "~/lib/utils";
import { Rating as RatingType } from "../../types";
import styles from "./styles.module.scss";

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
                    <span className="text-sm font-medium">Calidad</span>
                </div>
                <div className={styles.average}>
                    <div className={cn(styles.averageBox, difficultyStyles[rating.difficulty - 1])}>
                        {rating.difficulty * 2}
                    </div>
                    <span className="text-sm font-medium">Dificultad</span>
                </div>
            </div>
            <div className={styles.information}>

            </div>
        </div>
    )
}