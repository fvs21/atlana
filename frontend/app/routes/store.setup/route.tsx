import { MetaFunction } from "@remix-run/react"
import NavbarSmall from "~/components/navbar-small"
import CreateStoreForm from "~/features/store-create/components/CreateStoreForm"

export const meta: MetaFunction = () => {
    return [
        {
            title: "Tradenal: Crea tu tienda",
        },
    ]
}

export default function Page() {
    return (
        <main>
            <NavbarSmall />
            <CreateStoreForm />
        </main>
    )
}