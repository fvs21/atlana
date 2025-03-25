import { useState } from "react";
import styles from "./styles.module.scss";
import { defaultColors } from "../../utils/colors";
import { Plus } from "lucide-react";

type ColorPaletteProps = {
    color?: string;
    setColor: (color: string) => void;
};

export default function ColorPalette({ color, setColor }: ColorPaletteProps) {
    return (
        <div className={styles.colorPalette}>
            <div className={styles.defaultColorChoices}>
                {defaultColors.map((clr, index) => (
                    <button 
                        key={index} 
                        style={{ backgroundColor: clr }} 
                        className={styles.defaultColor} 
                        onClick={() => setColor(clr)}
                    />
                ))}
            </div>
            <div className="flex justify-end">
                <div className={styles.customColorContainer}>
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className={styles.customColorInput}
                    />
                    <span className={styles.customColor}>
                        <Plus size={16} color="white"/>
                    </span>
                </div>
            </div>
        </div>
    )
}