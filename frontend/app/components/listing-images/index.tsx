import { useState } from "react";
import styles from "./styles.module.scss";
import ListingImageCarousel from "./ListingImageCarousel";
import { cn } from "~/lib/utils";
import ListingImagesModal from "~/features/marketplace/components/ListingImagesModal";

export default function ListingImages({ images }: { images: string[] }) {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const [modalOpen, setModalOpen] = useState<boolean>(true);

    return (
        <div className={styles.listingImagesContainer}>
            <div className={styles.leftScroller}>
                {images.slice(0, Math.min(images.length, 2)).map((image, index) => (
                    <ImagePreview
                        key={index}
                        image={image}
                        click={() => setSelectedImage(index)}
                        selected={index === selectedImage}
                    />
                ))}
                {images.length > 2 && (
                    <button
                        className={cn(styles.imagePreviewContainer, styles.moreImagesButton)}
                        onClick={() => setModalOpen(true)}
                    >
                        +{images.length - 2}
                    </button>
                )}
            </div>
            <ListingImageCarousel
                images={images}
                selected={selectedImage}
                setSelected={setSelectedImage}
            />
            {modalOpen && (
                <ListingImagesModal
                    images={images}
                    onClose={() => setModalOpen(false)}
                />
            )}
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