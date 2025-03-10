import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import ValidatedInput from "~/components/validated-input";
import { useState } from "react";
import { cn } from "~/lib/utils";
import LabeledSelect from "~/components/labeled-select";
import { Label } from "~/components/ui/label";

export default function RegisterStoreModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Dialog modal>
            <DialogTrigger>
                <Button className={styles.startButton}>
                    Comienza
                </Button>
            </DialogTrigger>
            <DialogContent className={styles.modalContainer}>
                <div className={styles.formContainer}>
                    <DialogTitle>
                        Registra tu empresa y comienza a vender
                    </DialogTitle>
                    <div className={styles.form}>
                        <div className={styles.formInputContainer}>
                            <ValidatedInput
                                id="storeName"
                                name="storeName"
                                type="text"
                                className={styles.formInput}
                                label="Nombre de la empresa"
                            />
                        </div>
                        <div className={styles.formInputContainer}>
                            <Label>Ubicación de tu empresa</Label>
                            <div className={styles.countryInputsContainer}>
                                <LabeledSelect
                                    className={styles.countryInput}
                                    placeholder="País"
                                    options={["México"]}
                                    value=""
                                    name="country"
                                    onChange={() => { }}
                                />
                                <LabeledSelect
                                    className={styles.countryInput}
                                    placeholder="Estado"
                                    options={["Yucatán", "Quintana Roo", "Campeche"]}
                                    value=""
                                    name="state"
                                    onChange={() => { }}
                                />
                                <LabeledSelect
                                    className={styles.countryInput}
                                    placeholder="Ciudad"
                                    options={["Mérida", "Cancún", "Campeche"]}
                                    value=""
                                    name="city"
                                    onChange={() => { }}
                                />
                            </div>
                        </div>
                        <div className={styles.formInputContainer}>
                            <ValidatedInput
                                id="street"
                                name="street"
                                type="text"
                                className={styles.formInput}
                                placeholder="Dirección"
                            />
                        </div>
                        <div className={cn(styles.formInputContainer, styles.numberAndPostalCodeContainer)}>
                            <ValidatedInput
                                id="number"
                                name="number"
                                type="text"
                                className={cn(styles.formInput, styles.numberInput)}
                                placeholder="Número"
                            />
                            <ValidatedInput
                                id="postalCode"
                                name="postalCode"
                                type="text"
                                className={cn(styles.formInput, styles.numberInput)}
                                placeholder="Código postal"
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    <img className={styles.image} src="https://media.istockphoto.com/id/1189301950/photo/multiethnic-business-people-in-meeting.jpg?s=612x612&w=0&k=20&c=rxE9Jjyvnpu3aUObUkwhIGvC6oVmFvxYDeI8qlZKKKs=" />
                </div>
            </DialogContent>
        </Dialog>
    )
}