import { FileSpreadsheet, PencilLine } from "lucide-react";
import styles from "./styles.module.scss";
import { Label } from "~/components/ui/label";

export default function CreateListingOne() {
    return (
        <main className={styles.createListingOne}>
            <div className={styles.optionsContainer}>
                <button className={styles.option}>
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
                <button className={styles.option}>
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
