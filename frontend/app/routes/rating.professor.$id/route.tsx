import { useNavigate, useParams } from "@remix-run/react";
import LoadingScreen from "~/components/loading-screen";
import { useProfessor } from "~/features/professor-rating/api"
import styles from "./styles.module.scss";
import AverageRating from "~/features/professor-rating/components/AverageRating";
import Rating from "~/features/professor-rating/components/Rating";
import { Button } from "~/components/ui/button";

export default function Page() {
    const params = useParams();
    
    const navigate = useNavigate();

    const { professor, ratings, isLoading, isError } = useProfessor(Number.parseInt(params.id!));

    if (isLoading)
        return <LoadingScreen />

    if (isError)
        return (
            <div>
                No se encontró la página que buscas
            </div>
        )

    return (
        <div className={styles.professorPage}>
            <div className={styles.header}>
                <h1 className={styles.professorName}>
                    {professor?.name}
                </h1>
                <div>
                    Departamento: {professor?.department}
                </div>
                <div className="pt-4">
                    <Button className="primaryButton" onClick={() => navigate("/rating/rate/" + professor?.id)}>
                        Califica a este profesor
                    </Button>
                </div>
            </div>
            <div className={styles.averageRatings}>
                <AverageRating
                    rating={professor?.average_rating! * 2}
                    description="Calidad General"
                    type="number"
                />
                <AverageRating
                    rating={professor?.recommendation_rate! * 100}
                    description="Lo recomiendan"
                    type="percentage"
                />
                <AverageRating
                    rating={professor?.difficulty_level! * 2}
                    description="Nivel de dificultad"
                    type="number"
                />
            </div>
            <div className={styles.professorTags}>
                <h2 className={styles.tagsTitle}>Etiquetas para el profesor</h2>
                <div className={styles.tags}>
                    {professor?.tags.map((tag) => {
                        return (
                            <div className={styles.tag}>
                                {tag}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={styles.ratingsContainer}>
                <h2 className={styles.tagsTitle}>
                    {ratings?.count == 1 ? "1 Calificación" : `${ratings?.count} Calificaciones`}
                </h2>
                <div className={styles.ratings}>
                    {ratings?.list.map((rating) => {
                        return (
                            <Rating
                                key={rating.id}
                                rating={rating}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}