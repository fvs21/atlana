import { MetaFunction } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";

export const meta: MetaFunction = () => [
    { title: "Atlana: Terminos y Condiciones" },
    { name: "description", content: "Terminos y Condiciones de Atlana" },
    { name: "keywords", content: "atlana, terminos, condiciones, uso, servicio" }
]

export default function Page() {
    return (
        <>
            <NavbarSmall />
            <div className={styles.termsContainer}>
                <div className={styles.termsHeader}>
                    <h1 className={styles.termsTitle}>Términos y Condiciones</h1>
                    <span>Ultima vez actualizado: 6 de Junio del 2025</span>
                </div>
                <div className={styles.termsContent}>
                    <TermsSection>
                        <p>El presente documento establece los términos y condiciones generales (en adelante, los "Términos") que regulan el acceso y uso de la plataforma digital Atlana (en adelante, la "Plataforma", "Atlana", "nosotros", "nuestro" o "el sitio"), destinada a facilitar la compraventa e intercambio de productos entre estudiantes universitarios.</p>
                        <p>Al acceder, registrarse o utilizar Atlana, el Usuario acepta expresamente los presentes Términos. Si el Usuario no está de acuerdo con ellos, deberá abstenerse de utilizar la Plataforma.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="Misión">
                        <p>
                            En Atlana, nuestra misión es crear un marketplace sustentable, seguro y confiable que fomente el apoyo mutuo entre estudiantes universitarios, permitiendo la compraventa de bienes y servicios dentro de un entorno controlado, respetuoso y colaborativo. Creemos en una economía circular local que favorezca la reutilización, el emprendimiento y la confianza entre miembros de la comunidad estudiantil.
                        </p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="Definiciones">
                        <ul>
                            <li><strong>Usuario:</strong> Persona que accede y utiliza la Plataforma tras aceptar los presentes Términos.</li>
                            <li><strong>Plataforma:</strong> Sitio web o aplicación digital operado por Atlana.</li>
                            <li><strong>Cuenta verificada:</strong> Cuenta cuyo correo electrónico institucional ha sido validado conforme al proceso de verificación.</li>
                            <li><strong>Contenido generado por el usuario:</strong> Toda información, publicación, imagen, producto, servicio u opinión emitida por un Usuario en la Plataforma.</li>
                        </ul>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="1. Requisitos de Registro y Verificación">
                        <p>Para utilizar Atlana, el Usuario debe:</p>
                        <ul>
                            <li>Ser mayor de 17 años de edad.</li>
                            <li>Contar con una dirección de correo electrónico institucional emitida por su universidad.</li>
                            <li>Completar el proceso de verificación, que implica la confirmación de dicho correo mediante un enlace enviado por Atlana.</li>
                        </ul>
                        <p className="pt-4">La verificación tiene como objetivo garantizar que todos los Usuarios pertenezcan a una institución educativa superior, con el fin de mantener un entorno seguro y cerrado. Atlana se reserva el derecho de rechazar o eliminar cuentas que no cumplan con estos requisitos.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="2. Descripción del Servicio">
                        <p>Atlana pone a disposición de los Usuarios una plataforma digital para:</p>
                        <ul>
                            <li>Publicar productos para su compraventa o intercambio.</li>
                            <li>Navegar y buscar publicaciones realizadas por otros Usuarios.</li>
                            <li>Comunicarse directamente mediante mecanismos internos de mensajería.</li>
                        </ul>
                        <p className="pt-4">Atlana actúa como proveedor de tecnología y no participa como intermediario, comprador ni vendedor en las transacciones.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="3. Uso autorizado y prohibido">
                        <p>El uso de la Plataforma debe realizarse conforme a los presentes Términos y a las leyes aplicables. Queda estrictamente prohibido:</p>
                        <ul>
                            <li>Vender, promocionar o distribuir drogas ilegales, medicamentos sin receta, sustancias controladas o cualquier otro producto cuya comercialización esté prohibida.</li>
                            <li>Publicar contenido que sea violento, difamatorio, obsceno, discriminatorio, sexualmente explícito o contrario a las buenas costumbres.</li>
                            <li>Suplantar identidades o utilizar información falsa.</li>
                            <li>Usar la Plataforma para realizar actividades fraudulentas, dañinas o ilícitas.</li>
                        </ul>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="4. Contenido generado por el usuario">
                        <p>El Usuario es el único responsable del contenido que publique. Al hacerlo, otorga a Atlana una licencia no exclusiva, gratuita y global para mostrar, reproducir, modificar y distribuir dicho contenido dentro de la Plataforma.</p>
                        <p>El Usuario garantiza que posee los derechos necesarios sobre el contenido que publica, y que este no infringe derechos de terceros.</p>
                        <p>Atlana podrá eliminar cualquier contenido que infrinja estos Términos o las leyes aplicables.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="5. Cumplimiento de leyes y regulaciones">
                        <p>El Usuario se compromete a utilizar la Plataforma conforme a las leyes locales, estatales y federales aplicables, incluyendo aquellas relacionadas con comercio, protección de datos, propiedad intelectual, y publicidad.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="6. Limitación de responsabilidad e indemnización">
                        <p>Atlana no se responsabiliza por:</p>
                        <ul>
                            <li>Daños directos o indirectos derivados del uso de la Plataforma.</li>
                            <li>Transacciones fallidas o fraudulentas entre Usuarios.</li>
                            <li>Contenidos publicados por terceros.</li>
                        </ul>
                        <p className="pt-4">En caso de que un Usuario sea encontrado responsable o culpable de haber incurrido en una conducta fraudulenta o ilícita, ya sea como resultado de una investigación interna o por resolución de autoridad competente, Atlana podrá tomar medidas correctivas, incluyendo la suspensión definitiva de la cuenta y, de ser necesario, la entrega de información a las autoridades para la debida persecución del responsable. Asimismo, Atlana podrá colaborar activamente con la víctima para facilitar la resolución del conflicto.</p>
                        <p className="pt-4">Esta colaboración no implica responsabilidad legal ni garantía de resolución, pero refleja el compromiso de Atlana por mantener un entorno confiable.</p>
                        <p className="pt-4">El Usuario se compromete a indemnizar y mantener indemne a Atlana, sus directores, empleados y representantes frente a cualquier reclamación, responsabilidad o gasto derivado de su uso indebido de la Plataforma o del incumplimiento de estos Términos.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="7. Modificaciones y actualizaciones">
                        <p>Atlana podrá modificar en cualquier momento los presentes Términos. Las modificaciones serán notificadas con al menos siete (7) días  de anticipación. El uso continuado de la Plataforma implica la aceptación de los cambios.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="8. Solución de controversias y legislación aplicable">
                        <p>Cualquier controversia relacionada con estos Términos será resuelta mediante negociación directa entre las partes. Si no se llega a un acuerdo, las partes se someten expresamente a las leyes de los Estados Unidos Mexicanos y a la jurisdicción de los tribunales competentes del Estado de Yucatán, renunciando a cualquier otro fuero que pudiera corresponderles.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="9. Contacto">
                        <p>Para cualquier duda, comentario o solicitud relacionada con estos Términos, el Usuario puede ponerse en contacto con Atlana a través de los siguientes medios:</p>
                        <ul>
                            <li>Correo electrónico: <a href="mailto:soporte@atlana.mx" className=" font-bold">soporte@atlana.mx</a></li>
                        </ul>  
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection title="10. Términos generales">
                        <p>La nulidad de alguna disposición de estos Términos no afectará la validez de las demás. El hecho de que Atlana no ejerza un derecho en un momento dado no se considerará como una renuncia a dicho derecho en el futuro.</p>
                    </TermsSection>
                    <TermsSeparator />
                    <TermsSection>
                        <p style={{ color: "gray" }}>&copy; {new Date().getFullYear()} Atlana. Todos los derechos reservados.</p>
                    </TermsSection>
                </div>
            </div>
        </>
    )
}

function TermsSeparator() {
    return <hr className={styles.termsSeparator} />;
}

function TermsSection({ title, children }: { title?: string, children: React.ReactNode }) {
    return (
        <div className={styles.termsSection}>
            {title && <h2 className={styles.termsSectionTitle}>{title}</h2>}
            <div className={styles.termsSectionContent}>
                {children}
            </div>
        </div>
    );
}

export {
    TermsSection,
    TermsSeparator
}