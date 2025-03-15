import { MetaFunction } from "@remix-run/react"
import FooterSmall from "~/components/footer-small"
import NavbarSmall from "~/components/navbar-small"
import CreateStoreForm from "~/features/store-create/components/CreateStoreForm"
import styles from "./styles.module.scss";
import { LoaderFunctionArgs } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import { useUser } from "~/api/client.auth";

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
    const { user, isLoading } = useUser();

    return (
        <main className={styles.container}>
            <NavbarSmall />
            <div className={styles.content}>
                {!isLoading && (
                    user?.has_store_created ? (
                        <></>
                    ) : (
                        <CreateStoreForm />
                    )
                )}
            </div>
            <FooterSmall />
        </main>
    )
}