import { Form, Link, useActionData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import styles from "./login.module.scss"
import FooterSmall from "~/components/footerSmall"
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node"
import { data } from "@remix-run/react"
import Logo from "~/components/logo"
import ValidatedInput from "~/components/validated-input"
import PasswordInput from "~/components/password-input"
import { validateLoginForm } from "~/features/login/utils"

export const meta: MetaFunction = () => {
    return [
        {
            title: 'Poopy: Inicia sesión'
        }
    ]
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const errors = validateLoginForm({email, password});


    if (Object.keys(errors).length !== 0)
        return data({errors});
}

export default function LoginForm() {
    const actionData = useActionData<typeof action>();

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
                        <Form method="post" className={styles.form}>
                            <ValidatedInput
                                id="email"
                                name="email"
                                type="email"
                                label="Correo electrónico"
                                className={styles.formInput}
                                error={actionData?.errors.email}
                            />
                            <PasswordInput
                                id="password"
                                name="password"
                                label="Contraseña"
                                error={actionData?.errors.password}
                                className={styles.formInput}
                            />
                            <div className={styles.forgotPassword}>
                                <Link to="/forgot-password" className={styles.link}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                            <Button type="submit" className={styles.submitButton}>
                                Iniciar sesión
                            </Button>
                        </Form>

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

