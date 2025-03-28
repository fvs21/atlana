import { useAtom } from "jotai";
import { listingCustomOptionsAtom } from "../../store";
import styles from "./styles.module.scss";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddSizeModal from "../AddSizeModal";

export default function SizeInput() {
    const [options] = useAtom(listingCustomOptionsAtom);
    const [addSizeModal, setAddSizeModal] = useState<boolean>(false);

    return (
        <>
            {options.size && (
                <div className={styles.sizeInputContainer}>
                   <button className={styles.sizeInputButton} onClick={() => setAddSizeModal(true)}>
                        <Plus size={15}/>
                    </button> 
                </div>
            )}
            <AddSizeModal open={addSizeModal} close={() => setAddSizeModal(false)} />
        </>
    )
}