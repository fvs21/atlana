import { cn } from "~/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./ValidatedInput.module.scss";

type ValidatedInputProps = Omit<React.ComponentProps<"input">, "onChange" | "className"> & {
    onChange?: (value: string) => void;
    className?: string;
    label?: string;
    error?: string;
    [key: string]: any;
}

export default function ValidatedInput({ label, error, onChange, className, ...props}: ValidatedInputProps) {
    return (
        <div className={cn(styles.container, className)}>
            {label && <Label htmlFor={props.name} className="">{label}</Label>}
            <Input
                onChange={(e) => onChange && onChange?.(e.target.value)}
                className={error ? styles.inputError : ""}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}