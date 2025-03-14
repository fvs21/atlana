import AddPhoneModalOne from "../components/AddPhoneModal/AddPhoneModalOne";
import AddPhoneModalTwo from "../components/AddPhoneModal/AddPhoneModalTwo";


export function determineStep(step: number, next: () => void, close: () => void) {
    switch(step) {
        case 0:
            return <AddPhoneModalOne next={next} />;
        case 1:
            return <AddPhoneModalTwo close={close} />;
    }
}