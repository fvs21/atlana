import styles from "./styles.module.scss";

type AverageRatingProps = {
    rating: number;
    description: string;
    type: "number" | "percentage";
}

export default function AverageRating({ rating, description, type }: AverageRatingProps) {
    return (
        <div className={styles.ratingContainer}>
            <div className={styles.rating}>
                {parseFloat(rating.toFixed(2))}{type == "percentage" ? "%" : "/10"}
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
    )
}