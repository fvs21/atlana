import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./ValidatedInput.module.scss";

type ValidatedInputProps = {
    id: string;
    name: string;
    type: string;
    className?: string;
    label: string;
    error?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

export default function ValidatedInput({id, name, type, className, error, placeholder, value, onChange, label, ...props}: ValidatedInputProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={name} className="">{label}</Label>}
            <Input
                id={id}
                name={name}
                type={type}
                className={`${className} ${error ? styles.inputError : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...props}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )

}