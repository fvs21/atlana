import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { FileIcon, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { listingImagesAtom } from "../../store";

export default function AddImageModal({ open, close }: { open: boolean, close: () => void }) {
    const [, setListingImages] = useAtom(listingImagesAtom);

    const [image, setImage] = useState<File | null>(null);
    const containerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hoverFile = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        containerRef.current?.classList.add(styles.inputHover);
    }

    const unhoverFile = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        containerRef.current?.classList.remove(styles.inputHover);
    }

    const drop = (e: React.DragEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(styles.inputHover);

        const file = e.dataTransfer.files[0];
        
        if(!file) {
            toast.error("Error al subir la imagen");
            return;
        }

        if(!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            toast.error("El archivo debe ser una imagen en formato JPG o PNG");
            return;
        }

        setImage(file);
    }

    const openInput = () => {
        inputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if(!file) {
            toast.error("Error al subir la imagen");
            return;
        }

        if(!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
            toast.error("El archivo debe ser una imagen en formato JPG o PNG");
            return;
        }

        setImage(file);
    }

    const save = () => {
        if(!image)
            return;

        setListingImages((prev) => ([
            ...prev,
            image
        ]));
        setImage(null);
        close();
    }

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Agrega una imagen
                    </DialogTitle>
                    <DialogDescription>
                        Formatos aceptados: jpg, jpeg, png
                    </DialogDescription>
                </DialogHeader>
                <button    
                    ref={containerRef}
                    className={styles.addImageContainer}
                    onDragEnter={hoverFile}
                    onDragOver={hoverFile}
                    onDragLeave={unhoverFile}
                    onDrop={drop}
                    onClick={openInput}
                >
                    <FileIcon color="gray" />
                    Agrega o arrastra una imagen
                    <input 
                        hidden 
                        type="file" 
                        ref={inputRef} 
                        accept="image/jpep,image/jpg,image/png"
                        onChange={handleFileChange}
                    />
                </button>
                {image && (
                    <div>
                        <div className={styles.preview}>
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className={styles.imagePreview}
                            />
                            <div className={styles.imageInfo}>
                                <p className={styles.imageName}>{image.name}</p>
                                <Button className={styles.deleteButton} onClick={() => setImage(null)}>
                                    Eliminar 
                                    <Trash size={15} />
                                </Button>
                            </div>
                        </div>
                        <Button className="primaryButton" onClick={save}>
                            Agregar
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}