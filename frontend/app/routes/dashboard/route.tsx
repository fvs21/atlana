import { MetaFunction } from "@remix-run/react"
import { useUser } from "~/api/client.auth"

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Mi panel" },
    ]
}
export default function Page() { 
    const { user, isLoading } = useUser();

    return (
        <div>
            {user?.first_name}
        </div>
    )
}