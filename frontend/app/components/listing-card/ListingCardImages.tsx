import { useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import styles from "./styles.module.scss";

export default function ListingCardImages({ images }: { images: string[] }) {
    const [showArrows, setShowArrows] = useState<boolean>(false);
    const shouldShowArrows = images.length > 1;

    const hoverIn = () => {
        if(!shouldShowArrows) return;
        setShowArrows(true);
    }

    const hoverOut = () => {{
        if(!shouldShowArrows) return;
        setShowArrows(false);
    }}

    return (
        <Carousel className="relative" onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
            <CarouselContent>
                {images.map((image, i) => (
                    <CarouselItem key={i}>
                        <div className={styles.imageContainer}>
                            <img src={image} className={styles.image} />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {(images.length > 1 && showArrows) && (
                <>
                    <CarouselPrevious className={styles.leftButton} />
                    <CarouselNext className={styles.rightButton} />
                </>
            )}
        </Carousel>
    )
}