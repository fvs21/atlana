import { data, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { onlyAuthenticated, refreshToken } from "~/api/server.auth";
import FooterSmall from "~/components/footer-small";
import LoadingScreen from "~/components/loading-screen";
import Navbar from "~/components/navbar";
import { useListing } from "~/features/marketplace/api";
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
        });
        
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
    const loaderData = useLoaderData<typeof loader>();

    const { data, isLoading } = useListing(loaderData.listing);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <div className="flexColContainer">
            <Navbar />
            <main className="flex-grow">
                <Listing listing={data!} />
            </main>
            <FooterSmall />
        </div>
    )
    
}