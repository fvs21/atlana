import { useParams } from "@remix-run/react";

export default function Page() {
    const params = useParams();

    console.log(params.id);

    return (
        <div>
            jfoda
        </div>
    )
    
}