import { MetaFunction, Outlet } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";

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
            <div className="w-full h-full">
                <Outlet />
            </div>
        </div>
    )
}