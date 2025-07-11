import { MetaFunction } from "@remix-run/react";
import NavbarSmall from "~/components/navbar-small";

export const meta: MetaFunction = () => [
    {title: "Atlana: Tus profesores"}
]

export default function Page() {
    return (
        <div className="flexColContainer">
            <NavbarSmall />
        </div>
    )
}