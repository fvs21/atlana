import type React from "react"

import { useState } from "react"
import { Form, Link, useActionData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { ShoppingBag, Mail } from "lucide-react"
import styles from "./login.module.scss"
import FooterSmall from "~/components/footerSmall"
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node"
import { data } from "@remix-run/react"
import Logo from "~/components/logo"

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

    const errors: {
        email?: string;
        password?: string;
    } = {};

    if(email.length < 7) {
        errors.email = "Email is required";
    }

    if(password.length < 4) {
        errors.password = "Password is required";
    }

    return data({errors});
}

export default function LoginForm() {
    const actionData = useActionData<typeof action>();

    return (
        <>
            <div className={styles.container}>
                <Logo width={45} />
                <div className={styles.formWrapper}>
                    <div className={styles.formContent}>
                        <div className={styles.welcomeSection}>
                            <h2>Inicia sesión</h2>
                        </div>
                        <Form method="post" className={styles.form}>
                            <div className={styles.formGroup}>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="nombre@ejemplo.com"
                                    className={actionData?.errors.email ? styles.inputError : ""}
                                />
                                {actionData?.errors.email && <span className={styles.errorMessage}>{actionData.errors.email}</span>}
                            </div>

                            <div className={styles.formGroup}>
                                <div className={styles.passwordHeader}>
                                    <Label htmlFor="password">Password</Label>
                                    <Link to="/forgot-password" className={styles.forgotPassword}>
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    className={actionData?.errors.password ? styles.inputError : ""}
                                />
                                {actionData?.errors.password && <span className={styles.errorMessage}>{actionData.errors.password}</span>}
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

