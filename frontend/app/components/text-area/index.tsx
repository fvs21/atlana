import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import styles from "./styles.module.scss";

type TextAreaProps = React.ComponentProps<"textarea"> & {
    label?: string;
    error?: string;
}

export default function TextArea({ label, error, ...props }: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={props.name}>{label}</Label>}
            <Textarea
                className={cn(error ? styles.error : "", props.className)}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}