import { MetaFunction, Outlet } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import FooterSmall from "~/components/footer-small";

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });
    return {};
}

export const meta: MetaFunction = () => [
    {title: "Atlana: Tus profesores"}
]

export default function Page() {
    return (
        <div className="flexColContainer">
            <NavbarSmall />
            <div className={styles.container}>
                <Outlet />
            </div>
        </div>
    )
}