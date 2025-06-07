import FooterSmall from "~/components/footer-small";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";

export default function Page() {
    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <div className="flex flex-grow">
                <div className={styles.contactContainer}>
                    <h1 className={styles.contactTitle}>Contacto</h1>
                    <div className={styles.contactDescription}>
                        Correo: <a href="mailto:soporte@atlana.mx">
                            soporte@atlana.mx
                        </a>
                    </div>
                </div>
            </div>
            <FooterSmall />
        </div>
    )
}