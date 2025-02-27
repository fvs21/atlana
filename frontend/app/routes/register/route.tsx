import RegisterForm from "~/features/register/components/RegisterForm"
import styles from "./register.module.scss"
import { MetaFunction } from "@remix-run/react"

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Regístrate" },
    ]
}

export default function RegisterPage() {
    return (
       <>
            <div className={styles.container}>
                <RegisterForm />
                <div className={styles.imageContainer}>
                    <div className={styles.imageOverlay}></div>
                </div>
            </div>  
       </> 
    )
}

