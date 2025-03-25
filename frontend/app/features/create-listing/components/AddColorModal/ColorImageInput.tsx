import { FileInput } from "lucide-react";
import styles from "./styles.module.scss";

export default function ColorImageInput({ image, setImage }: { image: File | null, setImage: (image: File) => void }) {
    return (
        <div className={styles.colorImageInput}>
            <button className={styles.colorImageInputButton}>
                <FileInput  size={30}/>
                Arrastra una imagen o haz click para subir
            </button>
        </div>
    )
}