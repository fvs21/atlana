import { useAtom } from "jotai"
import { stepAtom } from "../../store"
import { determineCreateListingStep } from "../../utils";

export default function CreateListing() {
    const [step] = useAtom(stepAtom);

    return determineCreateListingStep(step);
}