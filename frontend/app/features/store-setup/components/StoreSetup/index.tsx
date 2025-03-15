import AboutSetup from "../AboutSetup";
import BannerSetup from "../BannerSetup";
import CategoriesSetup from "../CategoriesSetup";
import styles from "./styles.module.scss";

export default function StoreSetup() {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}>Configuración de tienda</h1>
            <div className={styles.setupSection}>
                <BannerSetup />
            </div>
            <div className={styles.setupSection}>
                <h2 className={styles.setupSectionTitle}>Acerca</h2>
                <AboutSetup />
            </div>
            <div className={styles.setupSection}>
                <h2 className={styles.setupSectionTitle}>Product Categories</h2>
                <CategoriesSetup />
            </div>
        </main>
    );
} 