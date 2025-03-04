import { data, LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction } from "@remix-run/react"
import { useUser } from "~/api/client.auth"
import { onlyAuthenticated } from "~/api/server.auth";

export const meta: MetaFunction = () => {
    return [
        { title: "Tradenal: Mi panel" },
    ]
}

export async function loader({request}: LoaderFunctionArgs) {
    onlyAuthenticated({request});

    return data({});
}

export default function Page() { 
    const { user, isLoading } = useUser();

    return (
        <div>
            {user?.first_name}
        </div>
    )
}