import RegisterStoreModalOne from "../components/RegisterStoreModal/RegisterStoreModalOne";
import RegisterStoreModalTwo from "../components/RegisterStoreModal/RegisterStoreModalTwo";

export function determineStep(step: number, setStep: (step: number) => void) {
    switch(step) {
        case 0:
            return <RegisterStoreModalOne setStep={setStep} />;
        case 1:
            return <RegisterStoreModalTwo setStep={setStep} />;
    }
}