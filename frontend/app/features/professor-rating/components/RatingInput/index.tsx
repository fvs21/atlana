import { Label } from "~/components/ui/label";
import styles from "./styles.module.scss";
import { cn } from "~/lib/utils";
import { useState } from "react";

const classes = [
    styles.five,
    styles.four,
    styles.three,
    styles.two,
    styles.one
]

type Meaning = {
    value: number;
    meaning: string;
}

type RatingInputProps = {
    label: string;
    value: number;
    setValue: (val: number) => void;
    className?: string;
    meanings: Meaning[];
}

export default function RatingInput({ label, value, setValue, className, meanings }: RatingInputProps) {
    const [meaning, setMeaning] = useState<Meaning | null>(null);
    const rev = [...meanings].reverse();

    return (
        <div>
            <Label>{label}</Label>
            <div className={cn(styles.ratingInput, className)}>
                {[0, 1, 2, 3, 4].map((i) => {
                    return (
                        <button
                            key={i}
                            className={cn(styles.rateNumber, classes[i], (value > 0 && value >= rev[i].value) ? styles.active : "")}
                            onMouseEnter={() => {
                                setMeaning(rev[i]);

                            }}
                            onMouseLeave={() => setMeaning(null)}
                            onClick={() => setValue(rev[i].value)}
                        />
                    )
                })}
            </div>
            {!!meaning ? (
                <span className="pt-2 text-sm text-gray-500">{meaning.value} - {meaning.meaning}</span>

            ) :
                !!value && <span className="pt-2 text-sm text-gray-500">{value} - {meanings[value - 1].meaning}</span>
            }
        </div>
    )
}