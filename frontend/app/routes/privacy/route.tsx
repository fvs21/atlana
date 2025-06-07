import { MetaFunction } from "@remix-run/react"
import NavbarSmall from "~/components/navbar-small"
import { TermsSection, TermsSeparator } from "../terms/route";
import styles from "../terms/styles.module.scss";

export const meta: MetaFunction = () => [
    { title: "Atlana: Política de privacidad" },
]

export default function Page() {
    return (
        <>
            <NavbarSmall />
            <div className={styles.termsContainer}>
                <div className={styles.termsHeader}>
                    <h1 className={styles.termsTitle}>Política de privacidad</h1>
                    <p className={styles.termsSubtitle}>Última actualización: 6 de junio del 2025</p>
                </div>
                <div className={styles.termsContent}>
                    <TermsSection title="1. Cobertura de esta política">
                        <p>Esta política se aplica a toda la información recopilada a través de la plataforma Atlana, ya sea por medio del sitio web, aplicación web o cualquier otro canal oficial de interacción. Al utilizar Atlana, usted acepta las prácticas descritas en esta Política.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="2. Información que recopilamos">
                        <p>Durante el registro y uso de la Plataforma, recolectaremos y almacenaremos toda información personal ingresada a la plataforma:</p>
                        <p>Esta información puede incluir pero no se limita a:</p>
                        <ul>
                            <li>Nombre completo</li>
                            <li>Contraseña</li>
                            <li>Correo electrónico institucional</li>
                            <li>Dirección IP</li>
                            <li>Universidad</li>
                            <li>Foto de perfil</li>
                            <li>Biografía, carrera, semestre actual</li>
                        </ul>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="3. Uso de la información">
                        <p>La información recopilada por Atlana se utiliza para ofrecer y mejorar la experiencia del usuario dentro de la Plataforma.</p>
                        <p>El nombre, carrera, semestre, etc. podrán ser visibles en el perfil público del Usuario para que otros miembros puedan identificarse entre sí de forma adecuada.</p>
                        <p>El correo electrónico se utiliza exclusivamente para la verificación de identidad y para el envío de notificaciones relevantes relacionadas con la cuenta del Usuario; dicho correo no será visible para otros usuarios ni se utilizará con fines publicitarios ni externos a Atlana.</p>
                        <p>La dirección IP, por su parte, se emplea únicamente para fines de administración del sitio, seguridad y auditoría interna, sin asociarla con fines de análisis o rastreo fuera de la Plataforma.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="4. Spam">
                        <p>Atlana se compromete a proteger su información. En ningún caso se venderán, alquilarán o compartirán correos electrónicos con terceros, ni se utilizarán correos electrónicos para enviar spam, promociones externas o cualquier comunicación no relacionada con la actividad de la Plataforma.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="5. Eliminación de la información">
                        <p>
                            Usted puede solicitar la eliminación de su cuenta y de su información personal en cualquier momento. La información se actualizará inmediatamente y no se mostrará a ningún usuario en el sitio.
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="6. Uso de cookies">
                        <p>
                            Las cookies son pequeños archivos de texto que se almacenan en su buscador cuando accede a un sitio web. Estas permiten que la Plataforma recuerde información sobre su visita, como mantener su sesión iniciada.
                        </p>
                        <p>
                            La Plataforma utiliza cookies estrictamente necesarias para mantener la sesión activa del Usuario durante su navegación.
                        </p>
                        <p>
                            Su buscador le puede permitir rechazar ciertas cookies, sin embargo, modificar esas configuraciones puede resultar en que no sea capaz de utilizar el sitio.
                        </p>
                        <p>
                            Estas cookies no se utilizan para recolectar información personal adicional ni con fines publicitarios o de seguimiento fuera de la Plataforma.
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="7. Seguridad de la información">
                        <p>
                            Las cuentas son protegidas por contraseñas, y Atlana toma medidas técnicas y organizativas razonables para salvaguardar la información personal de los usuarios. Utilizamos estándares de seguridad generalmente aceptados en la industria, incluyendo el cifrado seguro de contraseñas (por ejemplo, mediante algoritmos como argon2) y la restricción de acceso a datos sensibles solo al personal autorizado. El software que utilizan los servidores tienen la intención de prevenir acceso no autorizado.
                        </p>
                        <p>
                            Sin embargo, ningún sistema de seguridad es completamente infalible. Si bien nos esforzamos por proteger su información personal, siempre existe un riesgo inherente de que terceros no autorizados puedan acceder a ella mediante métodos ilegales o sofisticados. Al utilizar Atlana, usted comprende y acepta este riesgo.
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="8. Filtración de datos">
                        <p>En caso de que se detecte una violación de seguridad que comprometa la información personal de los usuarios (como una filtración de datos), se le notificará oportunamente a los usuarios afectados mediante correo electrónico.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="9. Cambios en esta política">
                        <p>
                            Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Cualquier cambio será notificado mediante la Plataforma y entrará en vigor siete (7) días después de su publicación.
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection>
                        <p>
                            Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, no dude en ponerse en contacto con nosotros a través de nuestro correo electrónico oficial: <a href="mailto:soporte@atlana.mx">soporte@atlana.mx</a>
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection>
                        <p style={{ color: "gray" }}>
                            &copy; {new Date().getFullYear()} Atlana. Todos los derechos reservados.
                        </p>
                    </TermsSection>
                </div>
            </div> 
        </>
    )
}
