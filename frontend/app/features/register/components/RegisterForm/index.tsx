import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { ShoppingBag } from "lucide-react"
import styles from "./RegisterForm.module.scss"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        userType: "buyer",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        companyName: ""
    });
    
    const [errors, setErrors] = useState({
        userType: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: "",
        companyName: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        })
      }
    
      const handleRadioChange = (value: string) => {
        setFormData({
          ...formData,
          userType: value,
        })
      }

    const validate = () => {
        let valid = true
        const newErrors = { ...errors }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "Escribe tu nombre"
            valid = false
        } else {
            newErrors.firstName = ""
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Escribe tu apellido"
            valid = false
        } else {
            newErrors.lastName = ""
        }

        if(!formData.companyName.trim()) {
            newErrors.companyName = "Escribe el nombre de tu empresa";
            valid = false;
        } else {
            newErrors.companyName = "";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Escribe tu correo electrónico"
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Correo electrónico inválido"
            valid = false
        } else {
            newErrors.email = ""
        }

        if (!formData.password) {
            newErrors.password = "Escribe una contraseña"
            valid = false
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe contener al menos 8 caracteres"
            valid = false
        } else {
            newErrors.password = ""
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden"
            valid = false
        } else {
            newErrors.confirmPassword = ""
        }

        if (!formData.agreeTerms) {
            newErrors.agreeTerms = "Debes aceptar los términos y condiciones"
            valid = false
        } else {
            newErrors.agreeTerms = ""
        }

        setErrors(newErrors)
        return valid
    } 

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validate()) {
        // Submit form data to your API
        console.log("Form submitted:", formData)
        }
    }

    return (
        <div className={styles.formWrapper}>
            <div className={styles.formContent}>
                <div className={styles.logoContainer}>
                    <ShoppingBag className={styles.logo} />
                    <h1>Tradenal</h1>
                </div>
                <h2>Crea tu cuenta</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <Label>Selecciona tu rol:</Label>
                        <RadioGroup
                            defaultValue={formData.userType}
                            onValueChange={handleRadioChange}
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
                        <div className={styles.formGroup}>
                            <Label htmlFor="firstName">Nombre(s)</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={errors.firstName ? styles.inputError : ""}
                            />
                            {errors.firstName && <span className={styles.errorMessage}>{errors.firstName}</span>}
                        </div>
                        <div className={styles.formGroup}>
                            <Label htmlFor="lastName">Apellido(s)</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={errors.lastName ? styles.inputError : ""}
                            />
                            {errors.lastName && <span className={styles.errorMessage}>{errors.lastName}</span>}
                        </div>
                    </div>
                    <div className={styles.formGroup}>
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? styles.inputError : ""}
                        />
                        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <Label htmlFor="email">Nombre de tu empresa</Label>
                        <Input
                            id="company"
                            name="company"
                            type="text"
                            value={formData.companyName}
                            onChange={handleChange}
                            className={errors.companyName ? styles.inputError : ""}
                        />
                        {errors.companyName && <span className={styles.errorMessage}>{errors.companyName}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={errors.password ? styles.inputError : ""}
                        />
                        {errors.password && <span className={styles.errorMessage}>{errors.password}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <Label htmlFor="confirmPassword">Confirma tu contraseña</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? styles.inputError : ""}
                        />
                        {errors.confirmPassword && <span className={styles.errorMessage}>{errors.confirmPassword}</span>}
                    </div>

                    <div className={styles.checkboxGroup}>
                        <div className={styles.checkboxWrapper}>
                            <Checkbox
                                id="agreeTerms"
                                name="agreeTerms"
                                checked={formData.agreeTerms}
                                onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked as boolean })}
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
                        {errors.agreeTerms && <span className={styles.errorMessage}>{errors.agreeTerms}</span>}
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
    )
}