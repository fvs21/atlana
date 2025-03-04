import { Link, useNavigate } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import styles from "./login.module.scss"
import FooterSmall from "~/components/footerSmall"
import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { data } from "@remix-run/react"
import Logo from "~/components/logo"
import ValidatedInput from "~/components/validated-input"
import PasswordInput from "~/components/password-input"
import { validateLoginForm } from "~/features/login/utils"
import { onlyGuests } from "~/api/server.auth"
import { useState } from "react"
import { LoginErrors } from "~/features/login/types"
import { useLogin } from "~/features/login/api"

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Poopy: Inicia sesión'
        }
    ]
}

export async function loader({request}: LoaderFunctionArgs) {
    onlyGuests({request});

    return data({});
}

export default function LoginForm() {
    const [errors, setErrors] = useState<LoginErrors>({
        email: "",
        password: "",
    });
    
    const navigate = useNavigate();

    const { login, isPending, loginDisabled } = useLogin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const validationErrors = validateLoginForm({email, password});

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login({email, password});
            navigate("/dashboard");
        } catch {
            setErrors({
                email: "",
                password: "Correo electrónico o contraseña incorrectos",
            });
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.loginBackground}>
                    <div className={styles.meshGradient}></div>
                </div>
                <div style={{zIndex: 1}}>
                    <Logo width={45} />
                </div>
                <div className={styles.formWrapper}>
                    <div className={styles.formContent}>
                        <div className={styles.welcomeSection}>
                            <h2>Inicia sesión</h2>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <ValidatedInput
                                id="email"
                                name="email"
                                type="email"
                                label="Correo electrónico"
                                className={styles.formInput}
                                error={errors.email}
                            />
                            <PasswordInput
                                id="password"
                                name="password"
                                label="Contraseña"
                                error={errors.password}
                                className={styles.formInput}
                            />
                            <div className={styles.forgotPassword}>
                                <Link to="/forgot-password" className={styles.link}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <Button type="submit" className={styles.submitButton} disabled={loginDisabled}>
                                Iniciar sesión
                            </Button>
                        </form>
                        <div className={styles.signupLink}>
                            ¿No tienes una cuenta?{" "}
                            <Link to="/register" className={styles.link}>
                                Regístrate
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <FooterSmall />
        </>
    )
}

