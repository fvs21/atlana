import { LoaderFunctionArgs } from "@remix-run/node";
import { Link, MetaFunction } from "@remix-run/react";
import { onlyGuests } from "~/api/server.auth";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import AuthForm from "~/components/auth-form";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useForgotPassword } from "~/features/reset-password/api";
import { useState } from "react";
import { AxiosError } from "axios";
import { ResponseBody } from "~/types/globals";
import { toast } from "sonner";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyGuests({ request });
    return null;
}

export const meta: MetaFunction = () => {
    return [
        { title: "Marketplace: Olvide mi contraseña" }
    ]
}

export default function Page() {
    const [email, setEmail] = useState("");

    const [error, setError] = useState<string>("");

    const { forgotPassword, isPending, forgotPasswordDisabled } = useForgotPassword();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (forgotPasswordDisabled) return;

        setError("");
        
        try {
            await forgotPassword(email);
            toast.success("Se ha enviado un correo electrónico para restablecer tu contraseña.");
        } catch(e) {
            const error = (e as AxiosError).response?.data as ResponseBody<null>;

            switch (error.code) {
                case "token_rate_limit":
                    setError("Has solicitado un restablecimiento de contraseña recientemente. Por favor, espera un momento e inténtalo de nuevo.");
                    break;
                case "user_does_not_exist":
                    setError("No se encontró ningún usuario con ese correo electrónico.");
                    break;
                case "user_already_changed_password":
                    setError("Ya has cambiado tu contraseña recientemente. Debes esperar un día para volver a cambiarla.");
                    break;
            }
        }
    }

    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <div className={styles.forgotPasswordContainer}>
                <div className={styles.returnButtonContainer}>
                    <div className={styles.returnButtonWrapper}>
                        <Link className={styles.returnButton} to={"/login"}>
                            <ChevronLeft />
                            Regresar
                        </Link>
                    </div>
                </div>
                <AuthForm className={styles.forgotPasswordFormContainer}>
                    <div className={styles.insideReturnButton}>
                        <Link className={styles.returnButton} to={"/login"}>
                            <ChevronLeft />
                            Regresar
                        </Link>
                    </div>
                    <div className={styles.forgotPasswordTitle}>
                        <h2>Olvidé mi contraseña</h2>
                    </div>
                    <div className={styles.forgotPasswordDescription}>
                        <p>
                            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                    </div>
                    <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
                        <div>
                            <ValidatedInput
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo electrónico"
                                required
                                autoComplete="email"
                                className="authInput"
                                value={email}
                                onChange={setEmail}
                                error={error}
                            />
                        </div>
                        <div className={styles.submitButtonContainer}>
                            <Button 
                                className="primaryButton w-full" 
                                size={"lg"} 
                                type="submit"
                                disabled={forgotPasswordDisabled}
                            >
                                Enviar correo
                            </Button>
                        </div>
                    </form>
                </AuthForm>
            </div>
        </div>
    )
}