import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import styles from "./styles.module.scss";

type TextAreaProps = {
    id: string;
    name: string;
    className?: string;
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    error?: string;
}

export default function TextArea({ id, name, className, placeholder, value, onChange, label, error }: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Textarea
                id={id}
                name={name}
                className={cn(className, error ? styles.inputError : "")}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange(event.target.value)}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}