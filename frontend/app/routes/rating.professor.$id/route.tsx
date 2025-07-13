import { useParams } from "@remix-run/react";
import LoadingScreen from "~/components/loading-screen";
import { useProfessor } from "~/features/professor-rating/api"

export default function Page() {
    const params = useParams();

    const { professor, isLoading } = useProfessor(Number.parseInt(params.id!));

    if(isLoading)
        return <LoadingScreen />

    return (
        <div>
        </div>
    )
}