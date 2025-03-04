import { data, LoaderFunctionArgs } from "@remix-run/node"
import { MetaFunction, Outlet } from "@remix-run/react"
import React from "react";
import NavbarSmall from "~/components/navbar-small";

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
        <React.Fragment>
            <NavbarSmall />
            <Outlet />
        </React.Fragment>
    )
}