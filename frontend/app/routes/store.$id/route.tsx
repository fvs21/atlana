import { data, LoaderFunctionArgs } from "@remix-run/node"
import { MetaFunction, Outlet } from "@remix-run/react"
import axios from "axios";
import React from "react";
import { BASE_URL } from "~/api";
import Footer from "~/components/footer";
import NavbarSmall from "~/components/navbar-small";
import { ResponseBody, Store } from "~/types/globals";

export async function loader({ params }: LoaderFunctionArgs) {
    try {
        const store_data = await axios.get<ResponseBody<{ store: Store }>>(BASE_URL + `/store/${params.id}`);
        return data(store_data.data.data?.store);
    } catch(error) {
        throw new Response("La tienda que buscas no existe", { status: 404 });
    }    
}

export const meta: MetaFunction<typeof loader> = ({data}) => {    
    return [
        { title: `Tradenal: ${data?.name}` }
    ]
}

export default function Page() {
    return (
        <React.Fragment>
            <NavbarSmall />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}