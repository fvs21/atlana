import RegisterStoreModalOne from "../components/RegisterStoreModal/RegisterStoreModalOne";
import RegisterStoreModalTwo from "../components/RegisterStoreModal/RegisterStoreModalTwo";

export function determineStep(step: number, next: () => void, close: () => void) {
    switch(step) {
        case 0:
            return <RegisterStoreModalOne next={next} />;
        case 1:
            return <RegisterStoreModalTwo close={close} />;
    }
}