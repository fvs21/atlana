import styles from "./register.module.scss"
import { data, Form, MetaFunction, useActionData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { ShoppingBag } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { ActionFunctionArgs } from "@remix-run/node"
import { RegisterBody } from "~/features/register/types"
import { validateRegisterBody } from "~/features/register/utils"
import Logo from "~/components/logo"
import ValidatedInput from "~/components/validated-input"
import PasswordInput from "~/components/password-input"

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Regístrate" },
    ]
}

export async function action({request}: ActionFunctionArgs) {
    const formData = await request.formData();

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const companyName = formData.get("companyName") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const userType = formData.get("userType") as string;
    const agreeTerms = formData.get("agreeTerms") as string;
    

    const body: RegisterBody = {
        firstName,
        lastName,
        userType,
        email,
        companyName,
        password,
        confirmPassword,
    }

    console.log(body);
    

    const errors = validateRegisterBody(body);

    if(agreeTerms != "on") {
        errors.agreeToTerms = "Debes aceptar los términos y condiciones";
    }
    

    if (Object.keys(errors).length) {
        return data({errors});
    }

    return data({});
}

export default function RegisterPage() {
    const actionData = useActionData<typeof action>();

    const errors = (actionData as any)?.errors;


    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formContent}>
                    <Logo width={35} />
                    <h2>Crea tu cuenta</h2>
                    <Form className={styles.form} method="post">
                        <div className={styles.formGroup}>
                            <Label>Selecciona tu rol:</Label>
                            <RadioGroup
                                name="userType"
                                defaultValue={'buyer'}
                                className={styles.radioGroup}
                            >
                                <div className={styles.radioOption}>
                                    <RadioGroupItem value="buyer" id="buyer" color="red" />
                                    <Label htmlFor="buyer" className={styles.radioLabel}>
                                        Comprador
                                    </Label>
                                </div>
                                <div className={styles.radioOption}>
                                    <RadioGroupItem value="seller" id="seller" />
                                    <Label htmlFor="seller" className={styles.radioLabel}>
                                        Vendedor
                                    </Label>
                                </div>
                                <div className={styles.radioOption}>
                                    <RadioGroupItem value="both" id="both" />
                                    <Label htmlFor="both" className={styles.radioLabel}>
                                        Ambos
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className={styles.nameFields}>
                            <ValidatedInput
                                id="firstName"
                                name="firstName"
                                type="text"
                                label="Nombre(s)"
                                error={errors?.firstName}
                                className={styles.formInput}
                            />
                            <ValidatedInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                label="Apellido(s)"
                                error={errors?.lastName}
                                className={styles.formInput}
                            />
                        </div>
                        <ValidatedInput 
                            id="email"
                            name="email" 
                            type="email" 
                            label="Correo electrónico" 
                            error={errors?.email} 
                            className={styles.formInput} 
                        />
                        <ValidatedInput 
                            id="companyName"
                            name="companyName" 
                            type="text" 
                            label="Nombre de tu empresa" 
                            error={errors?.companyName} 
                            className={styles.formInput}
                        />
                        <PasswordInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            error={errors?.password}
                            className={styles.formInput}
                        />
                        <ValidatedInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirma tu contraseña"
                            error={errors?.confirmPassword}
                            className={styles.formInput}
                        />
                        <div className={styles.checkboxGroup}>
                            <div className={styles.checkboxWrapper}>
                                <Checkbox
                                    id="agreeTerms"
                                    name="agreeTerms"
                                />
                                <Label htmlFor="agreeTerms" className={styles.checkboxLabel}>
                                    Acepto los{" "}
                                    <a href="#" className={styles.link}>
                                        Terminos y condiciones
                                    </a>{" "}
                                    y la{" "}
                                    <a href="#" className={styles.link}>
                                        Política de privacidad
                                    </a>
                                </Label>
                            </div>
                            {errors?.agreeTerms && <span className={styles.errorMessage}>{errors.agreeTerms}</span>}
                        </div>
                        <Button type="submit" className={styles.submitButton}>
                            Crea tu cuenta
                        </Button>
                    </Form>

                    <div className={styles.loginLink}>
                        ¿Ya tienes una cuenta?{" "}
                        <a href="/login" className={styles.link}>
                            Inicia sesión
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageOverlay}></div>
            </div>
        </div>
    )
}

