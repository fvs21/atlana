import { cn } from "~/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./ValidatedInput.module.scss";

type ValidatedInputProps = Omit<React.ComponentProps<"input">, "onChange"> & {
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    [key: string]: any;
}

export default function ValidatedInput({ label, error, onChange, ...props}: ValidatedInputProps) {
    return (
        <div className={cn(styles.container, props.className)}>
            {label && <Label htmlFor={props.name} className="">{label}</Label>}
            <Input
                className={`${error ? styles.inputError : ""}`}
                onChange={(e) => onChange && onChange?.(e.target.value)}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )

}