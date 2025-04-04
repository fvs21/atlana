import { Label } from "~/components/ui/label";
import { CreateListingPrice } from "../../types";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";
import { Trash2 } from "lucide-react";

type ListingPriceInputProps = {
    value: CreateListingPrice[];
    onChange: (value: CreateListingPrice[]) => void;
}

export default function ListingPriceInput({ value, onChange }: ListingPriceInputProps) {
    const deletePrice = (index: number) => {
        const newValue = [...value];
        newValue.splice(index, 1);

        if (newValue.length === 0) {
            return;
        }

        onChange(newValue);
    }

    const size = value.length;

    return (
        <div className={styles.container}>
            <Label>Precios</Label>
            {value.map((price, index) => (
                <div key={index} className={styles.priceRow}>
                    <Input
                        type="number"
                        value={price.min_units}
                        onChange={(e) => {
                            const newValue = [...value];
                            newValue[index].min_units = parseInt(e.target.value);
                            onChange(newValue);
                        }}
                        placeholder="Orden mínima"
                    />
                    {index < size - 1 && (
                        <Input
                            type="number"
                            value={price.max_units}
                            onChange={(e) => {
                                const newValue = [...value];
                                newValue[index].max_units = parseInt(e.target.value);
                                onChange(newValue);
                            }}
                            placeholder="Orden máxima"
                        />
                    )}
                    <Input
                        type="number"
                        value={price.price}
                        onChange={(e) => {
                            const newValue = [...value];
                            newValue[index].price = parseInt(e.target.value);
                            onChange(newValue);
                        }}
                        placeholder="Precio"
                    />
                    <Button onClick={() => deletePrice(index)}>
                        <Trash2 />
                    </Button>
                </div>
            ))}
            <button onClick={() => onChange([...value, {}])} className={styles.addPriceButton}>
                + Agregar precio
            </button>
        </div>
    )
}