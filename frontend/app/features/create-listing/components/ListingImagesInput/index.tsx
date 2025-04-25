import { useState } from "react";
import styles from "./styles.module.scss";
import { cn } from "~/lib/utils";
import { ArrowBigDown, ArrowBigUp, Ellipsis, Plus, Trash2 } from "lucide-react";
import { useAtom } from "jotai";
import { listingImagesAtom } from "../../store";
import AddImageModal from "../AddImageModal";
import ListingImageCarousel from "~/components/listing-images/ListingImageCarousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

export default function ListingImagesInput() {
    const [images] = useAtom(listingImagesAtom);
    const [selectedImage, setSelectedImage] = useState<number>(0);

    const [addImageModal, setAddImageModal] = useState<boolean>(false);

    return (
        <>
            <div className={styles.listingImagesContainer}>
                <div className={styles.leftScroller}>
                    {images.map((image, index) => (
                        <ImagePreview
                            key={index}
                            index={index}
                            selected={index === selectedImage}
                            image={image}
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

function LeftImageScroller({ images, selected, setSelected }: { images: string[], selected: number, setSelected: (index: number) => void }) {
    //TODO: Implement this component
}

function ImagePreview(
    { image, click, selected, index }: { image: File, click: () => void, selected: boolean, index: number }
) {
    const [images, setImages] = useAtom(listingImagesAtom);

    const up = () => {
        const newImages = [...images];
        const temp = newImages[index - 1];

        newImages[index - 1] = newImages[index];
        newImages[index] = temp;

        setImages(newImages);
    }

    const down = () => {
        const newImages = [...images];
        const temp = newImages[index + 1];

        newImages[index + 1] = newImages[index];
        newImages[index] = temp;

        setImages(newImages);
    }

    const remove = () => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    return (
        <div
            className={cn(styles.imagePreviewContainer, selected ? styles.selectedImage : "")}
            onClick={click}
        >
            <img src={URL.createObjectURL(image)} alt="Imagen del producto" className={styles.imagePreview} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className={styles.imagePreviewMore} onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
                        <Ellipsis size={15} />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        {index > 0 && (
                            <>
                                <DropdownMenuItem className={styles.imagePreviewMoreItem} onClick={up}>
                                    Subir
                                    <ArrowBigUp size={20} />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        {index < images.length - 1 && (
                            <>
                                <DropdownMenuItem className={styles.imagePreviewMoreItem} onClick={down}>
                                    Bajar
                                    <ArrowBigDown size={20} />
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </>
                        )}
                        <DropdownMenuItem className={styles.imagePreviewMoreItem} onClick={remove}>
                            Eliminar
                            <Trash2 size={18} />
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}