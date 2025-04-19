import { useState } from "react";
import styles from "./styles.module.scss";
import ListingImageCarousel from "./ListingImageCarousel";
import { cn } from "~/lib/utils";

export default function ListingImages({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    return (
        <div className={styles.listingImagesContainer}>
            <div className={styles.leftScroller}>
                {images.map((image, index) => (
                    <ImagePreview
                        key={index}
                        image={image}
                        click={() => setSelectedImage(index)}
                        selected={index === selectedImage}
                    />
                ))}
            </div>
            <ListingImageCarousel
                images={images}
                selected={selectedImage}
                setSelected={setSelectedImage}
            />
        </div>
    )
}

function ImagePreview({ image, click, selected }: { image: string, click: () => void, selected: boolean }) {
    return (
        <button className={cn(styles.imagePreviewContainer, selected ? styles.selected : "")} onClick={click}>
            <img src={image} alt="Imagen del producto" className={styles.imagePreview} />
        </button>
    )
}