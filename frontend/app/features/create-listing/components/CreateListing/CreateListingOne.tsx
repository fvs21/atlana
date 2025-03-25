import { FileSpreadsheet, PencilLine } from "lucide-react";
import styles from "./styles.module.scss";
import { Label } from "~/components/ui/label";
import { useAtom } from "jotai";
import { stepAtom } from "../../store";
import { useNavigate } from "@remix-run/react";
import { cn } from "~/lib/utils";

export default function CreateListingOne() {
    const [, setStep] = useAtom(stepAtom);
    const navigate = useNavigate();

    return (
        <main className={cn(styles.createListing, styles.createListingOne)}>
            <div>
                <h1 className={styles.createListingOneTitle}>
                    Nueva publicación
                </h1>
            </div>
            <div className={styles.optionsContainer}>
                <button className={styles.option} onClick={() => navigate("/create-listing/import")}>
                    <FileSpreadsheet size={32} />
                    <div>
                        <Label className={styles.label}>
                            Importar archivo excel
                        </Label>
                        <div className={styles.description}>
                            Importa todos tus productos desde un archivo excel
                        </div>
                    </div>
                </button>
                <button className={styles.option} onClick={() => setStep(1)}>
                    <PencilLine size={32} />
                    <div>
                        <Label className={styles.label}>
                            Crear publicación
                        </Label>
                        <div className={styles.description}>
                            Crea una publicación manualmente para un producto nuevo
                        </div>
                    </div>
                </button>
            </div>
        </main>
    )
}
