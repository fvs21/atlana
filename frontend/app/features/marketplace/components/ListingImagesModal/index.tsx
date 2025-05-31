import styles from "./styles.module.scss";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

type ListingImagesModalProps = {
    images: string[];
    onClose: () => void;
}

function ListingImagesModalOverlay({ children }: { children?: React.ReactNode }) {
    return (
        createPortal(
            (
                <RemoveScroll>
                    <div className={styles.modalOverlay}>
                        {children}
                    </div>
                </RemoveScroll>
            ),
            document.body
        )
    )
}

export default function ListingImagesModal({ images, onClose }: ListingImagesModalProps) {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const previousImage = () => {
        if (selectedImage == 0)
            return;
        setSelectedImage(selectedImage - 1);
    }

    const nextImage = () => {
        if (selectedImage === images.length - 1)
            return;
        setSelectedImage(selectedImage + 1);
    }

    return (
        <ListingImagesModalOverlay>
            <div className={styles.modalContent}>
                <header className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={18} />
                        Cerrar
                    </button>
                </header>
                <section className={styles.modalBody}>
                    <button
                        className={cn(styles.navigationButton, selectedImage === 0 ? styles.navigationButtonDisabled : "")}
                        onClick={previousImage}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <div className={styles.selectedImageContainer}>
                        <img
                            src={images[selectedImage]}
                            alt={`Imagen del producto ${selectedImage + 1}`}
                            className={styles.selectedImage}
                        />
                    </div>
                    <button
                        className={cn(styles.navigationButton, selectedImage === images.length - 1 ? styles.navigationButtonDisabled : "")}
                        onClick={nextImage}
                    >
                        <ChevronRight size={18} />
                    </button>
                </section>
                <div className={styles.imagesGrid}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`${styles.imagePreviewContainer} ${index === selectedImage ? styles.selected : ""}`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <img src={image} alt={`Imagen del producto ${index + 1}`} className={styles.imagePreview} />
                        </button>
                    ))}
                </div>
            </div>
        </ListingImagesModalOverlay>
    );
}