import { Location } from "~/types/location";
import styles from "./styles.module.scss";
import LabeledSelect from "../labeled-select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type LocationInputProps = {
    location: Location;
    onChange: (value: Location) => void;
    label?: string;
};

export default function LocationInput({ location, onChange, label }: LocationInputProps) {
    const changeCountry = (country: string) => {
        onChange({ ...location, country });
    }
    const changeState = (state: string) => {
        onChange({ ...location, state });
    }
    const changeCity = (city: string) => {
        onChange({ ...location, city });
    }
    const changeStreet = (street: string) => {
        onChange({ ...location, street });
    }

    return (
        <div className={styles.inputContainer}>
            {label && <Label>{label}</Label>}
            <div className={styles.countryContainer}>
                <LabeledSelect 
                    value={location.country}
                    onChange={changeCountry}
                    name="country"
                    options={["México"]}
                    placeholder="País"
                    className={styles.locationInput}
                />
                <LabeledSelect 
                    value={location.state}
                    onChange={changeState}
                    name="country"
                    options={["Yucatán"]}
                    placeholder="Estado"
                    className={styles.locationInput}
                />
                <LabeledSelect 
                    value={location.city}
                    onChange={changeCity}
                    name="city"
                    options={["Mérida"]}
                    placeholder="Ciudad"
                    className={styles.locationInput}
                />
            </div>
            <div className={styles.addressContainer}>
                <Input 
                    value={location.street}
                    onChange={(e) => changeStreet(e.target.value)}
                    name="street"
                    placeholder="Calle"
                    className={styles.streetInput}
                />
            </div>
            <div className={styles.countryContainer}>
                <Input 
                    value={location.zip_code}
                    onChange={(e) => onChange({ ...location, zip_code: e.target.value })}
                    name="zip_code"
                    placeholder="Código postal"
                    className={styles.zipCodeInput}
                />
                <Input 
                    value={location.number}
                    onChange={(e) => onChange({ ...location, number: e.target.value })}
                    name="number"
                    placeholder="Número interior/Departamento (opcional)"
                    className={styles.numberInput}
                />
            </div>
        </div>
    )
}