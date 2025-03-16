import { data, LoaderFunctionArgs } from "@remix-run/node"
import { MetaFunction, Outlet, useLoaderData } from "@remix-run/react"
import axios from "axios";
import React from "react";
import { BASE_URL } from "~/api";
import Footer from "~/components/footer";
import NavbarSmall from "~/components/navbar-small";
import Header from "~/features/store/components/Header";
import Menubar from "~/features/store/components/MenuBar";
import { ResponseBody, Store } from "~/types/globals";
import styles from "./store.module.scss";

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
    const data = useLoaderData<typeof loader>();

    return (
        <React.Fragment>
            <NavbarSmall />
            <Header companyName={data?.name as string} />
            <div className={styles.bannerImageContainer}>
                <img className={styles.bannerImage} src="https://static.vecteezy.com/system/resources/previews/003/566/561/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg" />
            </div>
            <Menubar />
            <Outlet />
            <Footer />
        </React.Fragment>
    )
}