import { FileInput } from "lucide-react";
import styles from "./styles.module.scss";
import { useRef } from "react";
import { toast } from "sonner";

export default function ColorImageInput({ image, setImage }: { image: File | undefined, setImage: (image: File) => void }) {
    const inputContainerRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const hoverFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add(styles.inputHover);
    }

    const unhoverFile = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove(styles.inputHover);
    }

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
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

    return (
        <div 
            ref={inputContainerRef} 
            className={styles.colorImageInput} 
            onDragEnter={hoverFile} 
            onDragOver={hoverFile} 
            onDragLeave={unhoverFile}
            onDrop={drop}
        >
            <button className={styles.colorImageInputButton}>
                <FileInput  size={30}/>
                Arrastra una imagen o haz click para subir
            </button>
            <input ref={inputRef} hidden type="file" accept="image/jpeg|image/jpg|image/png"/>
        </div>
    )
}