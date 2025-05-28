import { Loader } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Loader className="animate-spin" />
        </div>
    );
}