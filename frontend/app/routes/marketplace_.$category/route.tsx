import { data, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { onlyAuthenticated } from "~/api/server.auth";
import categories from "~/constants/categories";

export async function loader({ params, request }: LoaderFunctionArgs) {
    onlyAuthenticated({request});
    const category = params.category;    


    if (!categories.map((cat) => cat.value).includes(category as string)) {
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
        { title: "Marketplace: " + category?.name },
    ];
}

export default function Page() {
    return (
        <div>njdsa</div>
    )
}