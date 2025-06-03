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
    onlyAuthenticated({ request });

    const id = params.id;

    if (isNaN(Number(id))) {
        throw new Response(null, {
            status: 404
        })
    }

    const token = await refreshToken({ request });

    const res = await fetchListing(Number(id), token?.data?.access_token!);

    if (!res) {
        throw new Response(null, {
            status: 404
        });
    }

    return data({
        listing: res.data?.listing
    });
}

export const meta: MetaFunction<typeof loader> = ({ data, error }) => {
    if (error) {
        return [
            { title: "Listing not found" },
        ];
    }

    return [
        { title: data?.listing?.title || "Listing not found" },
    ];
}

export default function Page() {
    const loaderData = useLoaderData<typeof loader>();

    const { data, isLoading } = useListing(loaderData.listing!);

    if (isLoading)
        return <LoadingScreen />;

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