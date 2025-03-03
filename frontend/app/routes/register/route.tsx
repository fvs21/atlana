import styles from "./register.module.scss";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { RegisterBody, RegisterErrors } from "~/features/register/types";
import { validateRegisterBody } from "~/features/register/utils";
import Logo from "~/components/logo";
import ValidatedInput from "~/components/validated-input";
import PasswordInput from "~/components/password-input";
import { useState } from "react";
import { useRegister } from "~/features/register/api";

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Regístrate" },
    ]
}

export default function RegisterPage() {  
    const [errors, setErrors] = useState<RegisterErrors>({
        first_name: "",
        last_name: "",
        email: "",
        company_name: "",
        password: "",
        confirm_password: "",
        agree_to_terms: "",
    });

    const { register, isPending, registerDisabled } = useRegister();
    const navigate = useNavigate();

    const validate = (body: RegisterBody, confirm_password: string, agree_terms: string): boolean => {
        const errors = validateRegisterBody(body);

        if(agree_terms != "on")
            errors.agree_to_terms = "Debes aceptar los términos y condiciones";

        if(body.password !== confirm_password)
            errors.confirm_password = "Las contraseñas no coinciden";  

        if(Object.keys(errors).length > 0) {
            setErrors(errors);
            return false;
        }

        return true;
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const first_name = formData.get("firstName") as string;
        const last_name = formData.get("lastName") as string;
        const user_type = formData.get("userType") as string;
        const email = formData.get("email") as string;
        const company_name = formData.get("companyName") as string;
        const password = formData.get("password") as string;
        const confirm_password = formData.get("confirmPassword") as string;
        const agree_terms = formData.get("agreeTerms") as string;

        const body: RegisterBody = {
            first_name,
            last_name,
            user_type,
            email,
            company_name,
            password
        } 
        
        if(!validate(body, confirm_password, agree_terms))
            return;

        try {
            await register(body);
            navigate("/dashboard");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formWrapper}>
                <div className={styles.formContent}>
                    <Logo width={35} />
                    <h2>Crea tu cuenta</h2>
                    <form className={styles.form} onSubmit={handleSubmit}>
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
                                error={errors?.first_name}
                                className={styles.formInput}
                            />
                            <ValidatedInput
                                id="lastName"
                                name="lastName"
                                type="text"
                                label="Apellido(s)"
                                error={errors?.last_name}
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
                            error={errors?.company_name} 
                            className={styles.formInput}
                        />
                        <PasswordInput
                            id="password"
                            name="password"
                            label="Contraseña"
                            error={errors?.password}
                            className={styles.formInput}
                        />
                        <PasswordInput
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirma tu contraseña"
                            error={errors?.confirm_password}
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
                            {errors?.agree_to_terms && <span className={styles.errorMessage}>{errors.agree_to_terms}</span>}
                        </div>
                        <Button type="submit" className={styles.submitButton}>
                            Crea tu cuenta
                        </Button>
                    </form>
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

