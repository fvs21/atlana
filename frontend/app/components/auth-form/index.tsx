import { cn } from "~/lib/utils";
import styles from "./styles.module.scss";

type AuthFormProps = {
    children: React.ReactNode;
    className?: string;
}

export default function AuthForm({ className, children }: AuthFormProps) {
    return (
        <div className={styles.container}>
            <div className={cn(styles.form, className)}>
                {children}
            </div>
        </div>
    )
}