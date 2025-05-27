import FooterSmall from "~/components/footer-small";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { MetaFunction, useParams, useSearchParams } from "@remix-run/react";
import { LoaderFunctionArgs, useNavigate } from "react-router";
import { onlyGuests } from "~/api/server.auth";
import AuthForm from "~/components/auth-form";
import ValidatedInput from "~/components/validated-input";
import { Button } from "~/components/ui/button";
import { useState } from "react";
import { useResetPassword } from "~/features/reset-password/api";
import { toast } from "sonner";

export async function loader({ request, params }: LoaderFunctionArgs) {
    onlyGuests({ request });
    
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    const email = url.searchParams.get("email");

    if (!token || !email) {
        throw new Response(null, {
            status: 400,
        })
    }

    return null;
}

export const meta: MetaFunction = () => (
    [
        { title: "Atlana: Restablecer contraseña" }
    ]
)

export default function Page() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState<string>("");

    const { resetPassword, isPending, resetPasswordDisabled } = useResetPassword();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if(!token && !password && !confirmPassword)
            return;

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        try {
            await resetPassword({
                new_password: password,
                confirm_password: confirmPassword,
                token: token as string,
                email: email as string,
            });
            toast.success("Tu contraseña ha sido restablecida con éxito.");
            navigate("/login");
        } catch(e) {
            console.log(e);
            
        }
    }

    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <main className={styles.resetPasswordContainer}>
                <AuthForm className={styles.resetPasswordFormContainer}>
                    <div className={styles.resetPasswordTitle}>
                        <h2>
                            Restablecer contraseña
                        </h2>
                    </div>
                    <div className={styles.resetPasswordDescription}>
                        <p>
                            Introduce tu nueva contraseña. Asegúrate de que sea segura y fácil de recordar.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <ValidatedInput 
                                type="password"
                                name="password"
                                placeholder="Introduce tu nueva contraseña"
                                required
                                className="authInput"
                                value={password}
                                onChange={setPassword}
                                error={error}
                            />
                        </div>
                        <div className="mt-4">
                            <ValidatedInput 
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirma tu nueva contraseña"
                                required
                                className="authInput"
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                error={error}
                            />
                        </div>
                        <div className={styles.submitButtonContainer}>
                            <Button 
                                className="primaryButton w-full" 
                                size={"lg"} 
                                type="submit"
                                disabled={resetPasswordDisabled}
                                isFetching={isPending}
                            >
                                Cambiar
                            </Button>
                        </div>
                    </form>
                </AuthForm>
            </main>
            <FooterSmall />
        </div>
    )
}