import { Checkbox } from "../ui/checkbox";
import styles from "./styles.module.scss";

type LabeledCheckboxProps = {
    id: string;
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function LabeledCheckbox({ id, label, checked, onChange }: LabeledCheckboxProps) {
    return (
        <div className={styles.labeledCheckbox}>
            <Checkbox id={id} checked={checked} onCheckedChange={() => onChange(!checked)} />
            <label htmlFor={id} className={styles.checkboxLabel}>{label}</label>
        </div>
    )
}