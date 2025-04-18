import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useNavigate } from "@remix-run/react";
import { useLayoutEffect } from "react";
import { useUser } from "~/api/client.auth";
import { onlyAuthenticated } from "~/api/server.auth";
import NavbarSmall from "~/components/navbar-small";
import styles from "./styles.module.scss";
import CreateListing from "~/features/create-listing/components/CreateListing";
import FooterSmall from "~/components/footer-small";

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Crea una publicación" }
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });
    return {};
}

export default function Page() {
    return (
        <div className={styles.container}>   
            <NavbarSmall />
            <div className={styles.content}>
                <CreateListing />    
            </div> 
            <FooterSmall />
        </div>
    )
}