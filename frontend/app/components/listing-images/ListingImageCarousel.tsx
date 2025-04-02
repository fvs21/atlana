import styles from "./styles.module.scss";
import { CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { useEffect, useState } from "react";

export default function ListingImageCarousel({ images, selected, setSelected }: { images: string[]; selected: number, setSelected: (index: number) => void }) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();

    useEffect(() => {
        if (carouselApi) {
            carouselApi.scrollTo(selected);
        }

        carouselApi?.on("scroll", (car) => {
            const index = car.selectedScrollSnap();
            setSelected(index);
        });

    }, [carouselApi, selected]);

    return (
        <Carousel setApi={setCarouselApi} className="w-full h-full">
            <CarouselPrevious className={styles.leftButton} />
            <CarouselContent className={styles.rightImageDisplayer}>
                {images.map((image, i) => (
                    <CarouselItem className={styles.rightImageContainer}>
                        <img src={image} alt="Imagen del producto" className={styles.rightImage} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext className={styles.rightButton} />
        </Carousel>
    )
}