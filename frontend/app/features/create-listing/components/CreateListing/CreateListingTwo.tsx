import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";
import ValidatedInput from "~/components/validated-input";
import { useAtom } from "jotai";
import { listingCategoryAtom, listingDescriptionAtom, listingTitleAtom, stepAtom } from "../../store";
import TextArea from "~/components/text-area";
import { ChevronLeft } from "lucide-react";
import LabeledSelect from "~/components/labeled-select";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { validateStepOne } from "../../utils/validators";

export default function CreateListingTwo() {
    const [title, setTitle] = useAtom(listingTitleAtom);
    const [description, setDescription] = useAtom(listingDescriptionAtom);
    const [category, setCategory] = useAtom(listingCategoryAtom);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
        category: "",
    });

    const nextButton = () => {
        const errors_ = validateStepOne(title, description, category);

        if (Object.keys(errors_).length > 0) {
            setErrors(errors_ as typeof errors);
            return;
        }

        setStep(2);
    }

    const [, setStep] = useAtom(stepAtom);

    return (
        <>
            <div className={styles.returnButtonContainer}>
                <button className={styles.returnButton} onClick={() => setStep(0)}>
                    <ChevronLeft size={24} />
                </button>
            </div>
            <div className={cn(styles.createListing, styles.createListingTwo)}>
                <h1 className={styles.createListingOneTitle}>
                    Crea tu publicación
                </h1>
                <div className={styles.createListingTwoForm}>
                    <div className={styles.formInput}>
                        <ValidatedInput
                            id="title"
                            name="title"
                            label="Título"
                            placeholder="Ej. Camisas de lino"
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
                            placeholder="Ej. Camisas de lino 100% natural"
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
                            options={['Autopartes', 'Herramientas', 'Electrónicos', 'Hogar', 'Jardín', 'Deportes', 'Juguetes', 'Ropa', 'Calzado', 'Accesorios', 'Otros']}
                            value={category}
                            onChange={setCategory}
                        />
                        {errors.category && (
                            <div className="pt-2">
                                <span className="errorMessage">{errors.category}</span>
                            </div>
                        )}
                    </div>
                    <div className={cn(styles.formInput, styles.nextButtonContainer)}>
                        <Button className="primaryButton" onClick={nextButton}>
                            Siguiente
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}