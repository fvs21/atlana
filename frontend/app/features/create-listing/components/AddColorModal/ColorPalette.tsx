import { useState } from "react";
import styles from "./styles.module.scss";
import { defaultColors } from "../../utils/colors";

export default function ColorPalette() {
    const [color, setColor] = useState<string>("");

    return (
        <div className={styles.colorPalette}>
            {defaultColors.map((clr, index) => (
                <button style={{ backgroundColor: clr }} className={styles.defaultColor}>
                    
                </button>
            ))}
        </div>
    )
}