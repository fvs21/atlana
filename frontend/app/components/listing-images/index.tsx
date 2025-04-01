import { useState } from "react";
import styles from "./styles.module.scss";

export default function ListingImages({images}: {images: string[]}) {
    const [selectedImage, setSelectedImage] = useState<number>(0);

    return (
        <div className={styles.listingImagesContainer}>
            <div className={styles.leftScroller}>
                {images.map((image, index) => (
                    <ImagePreview 
                        key={index} 
                        image={image} 
                        click={() => setSelectedImage(index)} 
                    />
                ))}
            </div>
            <div className={styles.rightImageDisplayer}>
                <img src={images[selectedImage]} alt="Imagen del producto" className={styles.rightImage} />
            </div>
        </div>
    )
}

function ImagePreview({image, click}: {image: string, click: () => void}) {
    return (
        <button className={styles.imagePreviewContainer} onClick={click}>
            <img src={image} alt="Imagen del producto" className={styles.imagePreview} />
        </button>
    )
}