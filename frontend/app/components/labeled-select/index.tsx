import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import styles from "./styles.module.scss";

type LabeledSelectProps = {
    name: string;
    label?: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export default function LabeledSelect({ name, label, options, value, onChange, className, placeholder }: LabeledSelectProps) {
    return (
        <div className={cn(styles.container, className)}>
            {label && <Label>{label}</Label>}
            <Select name={name} onValueChange={onChange} value={value}>
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem value={option} key={option}>{option}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}