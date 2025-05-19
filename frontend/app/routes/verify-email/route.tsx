import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useUser } from "~/api/client.auth";
import { onlyAuthenticatedNotVerified } from "~/api/server.auth"
import FooterSmall from "~/components/footer-small";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { Button } from "~/components/ui/button";
import ValidatedInput from "~/components/validated-input";
import { useState } from "react";
import { useResendVerificationEmail, useVerifyEmail } from "~/features/verification/api";
import { useNavigate } from "@remix-run/react";
import { AxiosError } from "axios";
import { ResponseBody } from "~/types/globals";
import { toast } from "sonner";

export const meta: MetaFunction = () => {
    return [
        { title: "Marketplace: Verificate " }
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticatedNotVerified({ request });

    return null;
}

export default function Page() {
    const { user, isLoading } = useUser();
    const navigate = useNavigate();

    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");

    const { verifyEmail, verifyEmailDisabled } = useVerifyEmail();
    const { resendCode, isPending: isResending, resendCodeDisabled } = useResendVerificationEmail();

    const handleVerifyEmail = async () => {
        if (verifyEmailDisabled) return;

        if(!code) 
            return;

        try {
            await verifyEmail(code);
            navigate("/marketplace");
        } catch (error) {
            if(!(error instanceof AxiosError)) 
                return;

            const response = (error as AxiosError).response?.data as ResponseBody<void>;

            if(response.code === "invalid_verification_code")
                setError("Código de verificación incorrecto");

        }
    }

    const handleResendVerificationCode = async () => {
        if (resendCodeDisabled) return;

        try {
            await resendCode();
            setError("");
            toast.success("Código enviado");
        } catch (error) {
            if(!(error instanceof AxiosError)) 
                return;

            const response = (error as AxiosError).response?.data as ResponseBody<void>;

            if(response.code === "code_rate_limit")
                toast.error("Debes esperar 5 minutos para solicitar un nuevo código");
        }
    }

    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <main className={styles.verifyEmailContainer}>
                <div className={styles.verifyEmailFormContainer}>
                    <div className={styles.verifyEmailForm}>
                        <h1 className={styles.verifyEmailTitle}>Verifica tu correo</h1>
                        <div className={styles.verifyEmailBody}>
                            {!isLoading && (
                                <p className={styles.verifyEmailDescription}>
                                    Te hemos enviado un correo a <span className="font-semibold">{user?.email}</span> con el código para verificar tu cuenta.
                                </p>
                            )}
                            <div className={styles.formInput}>
                                <ValidatedInput 
                                    name="verification-code"
                                    value={code}
                                    onChange={setCode}
                                    error={error}
                                />
                            </div>
                            <button 
                                className={styles.resendVerificationCodeButton} 
                                onClick={handleResendVerificationCode}
                                disabled={resendCodeDisabled}
                            >
                                Reenviar código
                            </button>
                            <div className={styles.verifyEmailActions}>
                                <Button 
                                    className="primaryButton" 
                                    onClick={handleVerifyEmail} 
                                    disabled={verifyEmailDisabled}
                                >
                                    Verificar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <FooterSmall />
        </div>
    )
}