import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import styles from "./styles.module.scss";

export default function ListingCardImages({ images }: { images: string[] }) {
    return (
        <Carousel className="relative">
            <CarouselContent>
                {images.map((image, i) => (
                    <CarouselItem key={i}>
                        <div className={styles.imageContainer}>
                            <img src={image} className={styles.image} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {images.length > 1 && (
                <>
                    <CarouselPrevious className={styles.leftButton} />
                    <CarouselNext className={styles.rightButton} />
                </>
            )}
        </Carousel>
    )
}