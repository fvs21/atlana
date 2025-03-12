import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type PhoneInputProps = {
    countryCode: string;
    phoneNumber: string;
    setCountryCode: (value: string) => void;
    setPhoneNumber: (value: string) => void;
    className?: string;
    label?: string;
    error?: string;
    name?: string;
}

export default function PhoneInput({ countryCode, phoneNumber, setCountryCode, setPhoneNumber, className, label, error, name }: PhoneInputProps) {
    return (
        <div className={cn(styles.container, className)}>
            {label && <Label>{label}</Label>}
            <div className={styles.phoneInput}>
                <Select>
                    <SelectTrigger className={cn(styles.countryCode, error ? "errorBorder" : "")}>
                        <SelectValue placeholder="País" />
                    </SelectTrigger>
                    <SelectContent defaultValue={countryCode} onChange={(e: any) => setCountryCode(e.target.value)}>
                        <SelectItem value="52">+52</SelectItem>
                    </SelectContent>
                </Select>
                <Input 
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={cn(styles.phoneNumber, error ? "errorBorder" : "")}
                    placeholder="Número de teléfono"
                    name={name}
                />
            </div>
            {error && <p className="errorMessage">{error}</p>}
        </div>
    )
}