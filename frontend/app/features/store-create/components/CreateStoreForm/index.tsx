import { useUser } from "~/api/client.auth";
import styles from "./styles.module.scss";
import AddPhoneModal from "~/features/seller-dashboard/components/AddPhoneModal";
import { useNavigate } from "@remix-run/react";
import ValidatedInput from "~/components/validated-input";
import { useState } from "react";
import { Location } from "~/types/location";
import LocationInput from "~/components/location-input";
import { Button } from "~/components/ui/button";

export default function CreateStoreForm() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

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

    console.log(locationInvalid);
    console.log(location);
    
    

    if (isLoading) {
        return <></>
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Registra tu empresa</h1>
                <div className={styles.inputContainer}>
                    <ValidatedInput
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
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
                    <Button className="primaryButton" disabled={locationInvalid || !storeName}>
                        Continuar
                    </Button>
                </div>
            </div>
            <AddPhoneModal open={!user?.phone_number || !user.has_phone_verified} setOpen={() => navigate("/seller")}/>
        </div>
    )
}