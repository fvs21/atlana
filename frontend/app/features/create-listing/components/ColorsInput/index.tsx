import { Plus } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingColorOptionsImagesAtom, listingCustomOptionsAtom } from "../../store";
import AddColorModal from "../AddColorModal";
import { useState } from "react";

export default function ColorsInput() {
    const [options] = useAtom(listingCustomOptionsAtom);
    const [addColorModal, setAddColorModal] = useState<boolean>(false);

    const [colorImages, setColorImages] = useAtom(listingColorOptionsImagesAtom);

    return (
        <>
            {options.color && (
                <div className={styles.colorInputContainer}>
                    {options.color.map((color, index) => {
                        if(color.image_index != undefined) {
                            return (
                                <img key={color.name} src={URL.createObjectURL(colorImages[color.image_index])} alt="Color" className={styles.addedColor}/>
                            )
                        }
                        else{ 
                            return (
                                <div key={color.name} className={styles.addedColor} style={{ backgroundColor: color.color_code }} />
                            )
                        }
                    })}
                    <button className={styles.colorInput} onClick={() => setAddColorModal(true)}>
                        <Plus size={16} />
                    </button>
                </div>
            )}
            <AddColorModal open={addColorModal} close={() => setAddColorModal(false)} />
        </>
    )
}