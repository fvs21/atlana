import { data, LoaderFunctionArgs } from "@remix-run/node"
import { MetaFunction } from "@remix-run/react"

export async function loader({ params }: LoaderFunctionArgs) {
    return data({
        id: params.id
    });
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `Tradenal: ${data?.id}` }
    ]
}

export default function Page() {
    return (
        <div>
            Setup store
        </div>
    )
}