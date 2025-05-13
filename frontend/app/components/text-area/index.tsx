import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import styles from "./styles.module.scss";
import React from "react";

type TextAreaProps = {
    id?: string;
    name: string;
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
    error?: string;
    maxLength?: number;
}

export default function TextArea({ id, name, className, placeholder, value, onChange, label, error, maxLength }: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Textarea
                id={id}
                name={name}
                className={cn(className, error ? styles.inputError : "", "resize-none")}
                placeholder={placeholder}
                value={value}
                onChange={(event) => onChange && onChange(event.target.value)}
                maxLength={maxLength}
            />
            {error && <span className="errorMessage">{error}</span>}
        </div>
    )
}