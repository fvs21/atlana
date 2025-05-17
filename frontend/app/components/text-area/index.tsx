import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import styles from "./styles.module.scss";

type TextAreaProps = Omit<React.ComponentProps<"textarea">, "onChange"> & {
    label?: string;
    error?: string;
    onChange?: (value: string) => void;
}

export default function TextArea({ label, error, onChange, ...props }: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            <Textarea
                onChange={(e) => onChange && onChange(e.target.value)}
                className={cn(error ? styles.error : "", props.className)}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}