import { ChevronLeft, Minus, Plus } from "lucide-react";
import styles from "./styles.module.scss";
import { useAtom } from "jotai";
import { listingCustomizableAtom, listingCustomOptionsAtom, stepAtom } from "../../store";
import { cn } from "~/lib/utils";
import LabeledCheckbox from "~/components/labeled-checkbox";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import ColorsInput from "../ColorsInput";

export default function CreateListingThree() {
    const [customizable, setCustomizable] = useAtom(listingCustomizableAtom);
    const [options, setOptions] = useAtom(listingCustomOptionsAtom);
    const [, setStep] = useAtom(stepAtom);

    const addColor = () => {
        if (options.color) {
            let newOptions = { ...options };
            delete newOptions.color;
            setOptions(newOptions);
        } else {
            setOptions({
                ...options,
                color: []
            });
        }
    }

    const addSize = () => {
        if (options.size) {
            let newOptions = { ...options };
            delete newOptions.size;
            setOptions(newOptions);
        } else {
            setOptions({
                ...options,
                size: []
            });
        }
    }

    const addModel = () => {
        if (options.model) {
            let newOptions = { ...options };
            delete newOptions.model;
            setOptions(newOptions);
        } else {
            setOptions({
                ...options,
                model: []
            });
        }
    }

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(1)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={cn(styles.createListing, styles.createListingTwo)}>
                <h1 className={styles.createListingOneTitle}>
                    Elige las opciones para tu publicación
                </h1>
                <div>
                    <div className={styles.formInput}>
                        <LabeledCheckbox
                            id="customizable"
                            label="Tu producto es personalizable? (color, talla, modelo)"
                            checked={customizable}
                            onChange={setCustomizable}
                        />
                    </div>
                    {!!customizable && (
                        <div className={styles.customOptionsContainer}>
                            <div className={styles.formInput}>
                                <OptionLabel option="Color" click={addColor} add={!!!options.color} />
                                <ColorsInput />
                            </div>
                            <div className={styles.formInput}>
                                <OptionLabel option="Talla" click={addSize} add={!!!options.size} />
                                {options.size && (
                                    <>BRO</>
                                )}
                            </div>
                            <div className={styles.formInput}>
                                <OptionLabel option="Modelo" click={addModel} add={!!!options.model} />
                            </div>
                        </div>
                    )}
                </div>
                <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                    <Button className="primaryButton" onClick={() => setStep(3)}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </>
    )
}

function OptionLabel({ option, click, add }: { option: string; click: () => void, add: boolean }) {
    return (
        <div className={styles.optionLabel}>
            <Label>{option}</Label>
            <button onClick={click}>
                {add ? <Plus size={16} /> : <Minus size={16} />}
            </button>
        </div>
    )
}