import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import AddPhoneModal from "~/features/seller-dashboard/components/AddPhoneModal";
import { useNavigate } from "@remix-run/react";
import ValidatedInput from "~/components/validated-input";
import { useState } from "react";
import { Location } from "~/types/location";
import LocationInput from "~/components/location-input";
import { Button } from "~/components/ui/button";
import { useRegisterStore } from "../../api";
import { toast } from "sonner";

export default function CreateStoreForm() {
    const { user } = useUser();
    const navigate = useNavigate();

    const { register, isPending, registerDisabled } = useRegisterStore();

    const [storeName, setStoreName] = useState<string>("");
    const [location, setLocation] = useState<Location>({
        country: "",
        state: "",
        city: "",
        zip_code: "",
        street: "",
        number: "",
    });

    const locationInvalid = (Object.keys(location) as (keyof Location)[]).some((key) => {
        if(key === 'number')
            return false;

        return location[key].length === 0;
    });

    const handleSubmit = async () => {
        if (registerDisabled) return;

        if (locationInvalid || !storeName) return;

        try {
            await register({
                name: storeName,
                store_location: location,
            });
            toast.success("Tienda registrada correctamente.");
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Registra tu empresa</h1>
                <div className={styles.inputContainer}>
                    <ValidatedInput
                        value={storeName}
                        onChange={setStoreName}
                        label="Nombre registrado de la empresa"
                        id="store-name"
                        name="store-name"
                        type="text"
                    />
                </div>
                <div className={styles.inputContainer}>
                    <LocationInput 
                        location={location} 
                        onChange={setLocation} 
                        label="Dirección física"
                    />
                </div>
                <div className={styles.buttonContainer}>
                    <Button className="primaryButton" disabled={locationInvalid || !storeName} onClick={handleSubmit}>
                        Continuar
                    </Button>
                </div>
            </div>
            <AddPhoneModal open={!user?.phone_number || !user.has_phone_verified} setOpen={() => navigate("/seller")}/>
        </div>
    )
}