import { useState } from "react";
import styles from "./styles.module.scss";
import { cn } from "~/lib/utils";
import { Plus } from "lucide-react";
import { useAtom } from "jotai";
import { listingImagesAtom } from "../../store";
import AddImageModal from "../AddImageModal";

export default function ListingImagesInput() {
    const [images, setImages] = useAtom(listingImagesAtom);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const [addImageModal, setAddImageModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.listingImagesContainer}>
                <div className={styles.leftScroller}>
                    {images.map((image, index) => (
                        <ImagePreview
                            key={index}
                            image={URL.createObjectURL(image)}
                            click={() => setSelectedImage(index)}
                        />
                    ))}
                    <button 
                        className={cn(styles.imagePreviewContainer, styles.addImageButton)} 
                        onClick={() => setAddImageModal(true)}
                    >
                        <Plus color="gray" />
                    </button>
                </div>
                <div className={styles.rightImageDisplayer}>
                    {images.length > 0 ? (
                        <img src={URL.createObjectURL(images[selectedImage])} alt="Imagen del producto" className={styles.rightImage} />
                    ) : (
                        <div className={cn(styles.rightImage, styles.addImageSign)}>
                            Comienza agregando imágenes
                        </div>
                    )}
                </div>
            </div>
            {addImageModal && <AddImageModal open={addImageModal} close={() => setAddImageModal(false)} />}
        </>
    )
}

function ImagePreview({ image, click }: { image: string, click: () => void }) {
    return (
        <button className={styles.imagePreviewContainer} onClick={click}>
            <img src={image} alt="Imagen del producto" className={styles.imagePreview} />
        </button>
    )
}