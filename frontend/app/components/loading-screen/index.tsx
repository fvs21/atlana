import { Loader } from "lucide-react";

export default function LoadingScreen() {
    return (
        <div className="flex items-center justify-center h-full w-full">
            <Loader className="animate-spin" />
        </div>
    );
}

export const LoadingScreenFull = () => {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-white z-50">
            <Loader className="animate-spin" />
        </div>
    );
}