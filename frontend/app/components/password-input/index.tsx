import { Eye, EyeOff } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./PasswordInput.module.scss";
import { useRef, useState } from "react";

type PasswordInputProps = Omit<React.ComponentProps<"input">, "onChange" | "className"> & {
    label: string;
    error?: string;
    className?: string;
    onChange?: (value: string) => void;
}

export default function PasswordInput({id, name, type, className, error, placeholder, value, onChange, label, ...props}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={styles.container}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <div style={{position: "relative"}}>
                <Input
                    id={id}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    className={`${className} ${error ? styles.inputError : ""}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange && ((e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value))}
                    {...props}
                />
                <button className={styles.showPasswordButton} type="button" onClick={handleShowPassword}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            </div>
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}