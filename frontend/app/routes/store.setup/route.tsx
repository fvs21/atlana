import { MetaFunction } from "@remix-run/react"
import FooterSmall from "~/components/footer-small"
import NavbarSmall from "~/components/navbar-small"
import CreateStoreForm from "~/features/store-create/components/CreateStoreForm"
import styles from "./styles.module.scss";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";

export const meta: MetaFunction = () => {
    return [
        {
            title: "Tradenal: Crea tu tienda",
        },
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });

    return {};
}

export default function Page() {
    return (
        <main className={styles.container}>
            <NavbarSmall />
            <CreateStoreForm />
            <FooterSmall />
        </main>
    )
}