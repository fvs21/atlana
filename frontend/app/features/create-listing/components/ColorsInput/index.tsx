import { Plus } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";
import AddColorModal from "../AddColorModal";
import { useState } from "react";

export default function ColorsInput() {
    const [options] = useAtom(listingCustomOptionsAtom);
    const [addColorModal, setAddColorModal] = useState<boolean>(false);

    return (
        <>
            {options.color && (
                <div className={styles.colorInputContainer}>
                    {options.color.map((color, index) => (
                        <div key={index} className={styles.colorInput}>
                            
                        </div>
                    ))}
                    <button className={styles.colorInput} onClick={() => setAddColorModal(true)}>
                        <Plus size={16} />
                    </button>
                </div>
            )}
            <AddColorModal open={addColorModal} close={() => setAddColorModal(false)} />
        </>
    )
}