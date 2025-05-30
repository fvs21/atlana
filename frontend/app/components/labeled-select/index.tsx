import { cn } from "~/lib/utils";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import styles from "./styles.module.scss";

type Option = {
    name: string;
    value: string;
}

type LabeledSelectProps = Omit<React.ComponentProps<typeof Select>, "onChange" | "value" | "className" | "placeholder" | "name"> & {
    name: string;
    label?: string;
    options: Option[];
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
    placeholder?: string;
}

export default function LabeledSelect({ name, label, options, className, onChange, placeholder, ...props}: LabeledSelectProps) {    
    return (
        <div className={cn(styles.container, className)}>
            {label && <Label>{label}</Label>}
            <Select 
                name={name} 
                onValueChange={onChange}
                {...props}
            >
                <SelectTrigger>
                    <SelectValue placeholder={placeholder}/>
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem value={option.value} key={option.value}>{option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}