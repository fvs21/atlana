import FooterSmall from "~/components/footer-small";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => [
    { title: "Atlana: Contacto" }
]

export default function Page() {
    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <div className="flex flex-grow">
                <div className={styles.contactContainer}>
                    <h1 className={styles.contactTitle}>Contacto</h1>
                    <div className={styles.contactDescription}>
                        <p>Si tienes alguna pregunta, situación, inquietud o sugerencia, contactanos en: </p>
                        <a style={{ fontWeight: "bold", paddingTop: "8px" }} href="mailto:soporte@atlana.mx">
                            soporte@atlana.mx
                        </a>
                    </div>
                </div>
            </div>
            <FooterSmall />
        </div>
    )
}