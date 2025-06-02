import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import styles from "./styles.module.scss";

type TextAreaProps = Omit<React.ComponentProps<"textarea">, "onChange" | "className"> & {
    label?: string;
    error?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export default function TextArea({ label, error, onChange, className, ...props }: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            <Textarea
                onChange={(e) => onChange && onChange(e.target.value)}
                className={cn(error ? styles.inputError : "", className)}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}