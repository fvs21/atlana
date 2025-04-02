import { useState } from "react";
import styles from "./styles.module.scss";
import { cn } from "~/lib/utils";
import { Plus } from "lucide-react";
import { useAtom } from "jotai";
import { listingImagesAtom } from "../../store";
import AddImageModal from "../AddImageModal";
import ListingImageCarousel from "~/components/listing-images/ListingImageCarousel";

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
                            selected={index === selectedImage}
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
                {images.length > 0 ? (
                    <ListingImageCarousel
                        images={images.map((image) => URL.createObjectURL(image))}
                        selected={selectedImage}
                        setSelected={setSelectedImage}
                    />
                ) : (
                    <div className={styles.addImageSign}>
                        Comienza agregando imágenes
                    </div>
                )}
            </div>
            {addImageModal && <AddImageModal open={addImageModal} close={() => setAddImageModal(false)} />}
        </>
    )
}

function ImagePreview({ image, click, selected }: { image: string, click: () => void, selected: boolean }) {
    return (
        <button className={cn(styles.imagePreviewContainer, selected ? styles.selectedImage : "")} onClick={click}>
            <img src={image} alt="Imagen del producto" className={styles.imagePreview} />
        </button>
    )
}