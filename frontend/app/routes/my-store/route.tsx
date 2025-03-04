import { MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => {
    return [
        {
            title: "Tradenal: Configura tu tienda"
        }
    ]
}

export default function Page() {
    return (
        <div>
            Setup store
        </div>
    )
}