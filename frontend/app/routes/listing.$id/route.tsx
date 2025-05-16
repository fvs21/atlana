import { data, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { onlyAuthenticated, refreshToken } from "~/api/server.auth";
import Navbar from "~/components/navbar";
import { fetchListing } from "~/features/marketplace/api/server";
import Listing from "~/features/marketplace/components/Listing";

export async function loader({ params, request }: LoaderFunctionArgs) {
    onlyAuthenticated({request});

    const id = params.id;

    if (isNaN(Number(id))) {
        throw new Response(null, {
            status: 404
        })
    }

    const token = await refreshToken({request});

    try {
        const res = await fetchListing(Number(id), token?.data?.access_token!);
        
        return data({
            ...res.data
        })
    } catch {
        return new Response(null, {
            status: 404
        })
    }
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: data.listing.title },
    ];
}

export default function Page() {
    const data = useLoaderData<typeof loader>();
    const listing = data.listing;

    return (
        <>
            <Navbar />
            <Listing listing={listing} />
        </>
    )
    
}