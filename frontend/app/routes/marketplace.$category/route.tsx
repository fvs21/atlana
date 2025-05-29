import { data, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useParams } from "@remix-run/react";
import { onlyAuthenticated } from "~/api/server.auth";
import categories from "~/constants/categories";
import { useFetchListingsByCategory } from "~/features/marketplace/api";
import ListingsDisplay from "~/features/marketplace/components/ListingsDisplay";
import { Category } from "~/types/listings";

export async function loader({ params, request }: LoaderFunctionArgs) {
    onlyAuthenticated({ request });
    const category = params.category;


    if (!categories.map((cat) => cat.value).includes(category as Category)) {
        throw new Response(null, {
            status: 404,
            statusText: "Category not found"
        });
    }

    return data({});
}

export const meta: MetaFunction = ({ params }) => {
    const category = categories.find((cat) => cat.value === params.category);
    return [
        { title: "Atlana: " + category?.name },
    ];
}

export default function Page() {
    const params = useParams();
    const category = params.category;

    const { data } = useFetchListingsByCategory(category as Category);

    return (
        <ListingsDisplay listings={data?.data?.listings || []} />
    )
}