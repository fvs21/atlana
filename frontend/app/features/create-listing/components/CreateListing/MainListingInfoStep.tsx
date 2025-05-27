import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import ValidatedInput from "~/components/validated-input";
import { useAtom } from "jotai";
import { listingCategoryAtom, listingDescriptionAtom, listingTitleAtom, listingUsedAtom, stepAtom } from "../../store";
import TextArea from "~/components/text-area";
import LabeledSelect from "~/components/labeled-select";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { validateStepOne } from "../../utils/validators";
import categories from "~/constants/categories";
import { Category } from "~/types/listings";

export default function MainListingInfoStep() {
    const [title, setTitle] = useAtom(listingTitleAtom);
    const [description, setDescription] = useAtom(listingDescriptionAtom);
    const [category, setCategory] = useAtom(listingCategoryAtom);
    const [used, setUsed] = useAtom(listingUsedAtom);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        category: "",
        used: ""
    });

    const nextButton = () => {
        const errors_ = validateStepOne(title, description, category, used);

        if (Object.keys(errors_).length > 0) {
            setErrors(errors_ as typeof errors);
            return;
        }

        setStep(1);
    }

    const [, setStep] = useAtom(stepAtom);

    return (
        <div className={cn(styles.createListing, styles.createListingOne)}>
            <h1 className={styles.createListingOneTitle}>
                Crea tu publicación
            </h1>
            <div className={styles.createListingTwoForm}>
                <div className={styles.formInput}>
                    <ValidatedInput
                        id="title"
                        name="title"
                        label="Título"
                        placeholder="Ej. Macbook Pro 2020"
                        value={title}
                        onChange={setTitle}
                        type="text"
                        error={errors.title}
                    />
                </div>
                <div className={styles.formInput}>
                    <TextArea
                        id="description"
                        name="description"
                        label="Descripción"
                        placeholder="Ej. Macbook Pro del año 2020, en perfecto estado, con cargador y caja original. Sin rayones ni golpes."
                        value={description}
                        onChange={setDescription}
                        className={styles.formDescription}
                        error={errors.description}
                    />
                </div>
                <div className={styles.formInput}>
                    <LabeledSelect
                        name="category"
                        placeholder="Selecciona la categoría de tu producto"
                        label="Categoría"
                        options={categories.map((category) => ({name: category.name, value: category.value}))}
                        value={category || ""}
                        onChange={(val: string) => {
                            setCategory(val as Category);
                        }}
                    />
                    {errors.category && (
                        <div className="pt-2">
                            <span className="errorMessage">{errors.category}</span>
                        </div>
                    )}
                </div>
                {(category && !["food", "property_rentals"].includes(category)) && (
                    <div className={styles.formInput}>
                        <LabeledSelect
                            name="used"
                            label="Condición del producto"
                            placeholder="Selecciona una opción"
                            options={[
                                { name: "Nuevo", value: "new" },
                                { name: "Usado", value: "used" }
                            ]}
                            value={used ? "used" : "new"}
                            onChange={(val: string) => {
                                setUsed(val === "used");
                            }}
                        />
                        {errors.used && (
                            <div className="pt-2">
                                <span className="errorMessage">{errors.used}</span>
                            </div>
                        )}
                    </div>
                )}
                <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                    <Button className="primaryButton" onClick={nextButton}>
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    )
}