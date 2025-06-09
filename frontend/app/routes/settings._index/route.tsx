import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import styles from "../settings/styles.module.scss";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated ({ request });
    return {};
}

export default function Page() {
    return (
        <div className={styles.defaultSettings}>
            Haz click en una configuración
        </div>
    )
}