import { Link, useNavigate } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import styles from "./login.module.scss"
import FooterSmall from "~/components/footer-small"
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
import AuthForm from "~/components/auth-form"

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Marketplace: Inicia sesión'
        }
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    onlyGuests({ request });

    return data({});
}

export default function LoginForm() {
    const [errors, setErrors] = useState<LoginErrors>({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const { login, loginDisabled } = useLogin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const validationErrors = validateLoginForm({ email, password });

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login({ email, password });
            navigate("/marketplace");
        } catch {
            setErrors({
                email: "",
                password: "Correo electrónico o contraseña incorrectos",
            });
        }
    }

    return (
        <div className="flexColContainer">
            <div className={styles.container}>
                <div style={{ zIndex: 1 }} className={styles.logo}>
                    <Logo width={45} />
                </div>
                <AuthForm className={styles.formWrapper}>
                    <div className={styles.formContent}>
                        <div className={styles.insideLogo}>
                            <Logo width={35} />
                        </div>
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
                                className={styles.formPassword}
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
                </AuthForm>
            </div>
            <FooterSmall />
        </div>
    )
}

