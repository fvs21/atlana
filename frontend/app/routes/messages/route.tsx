import { useEffect, useState } from "react";
import { useToken } from "~/api/client.auth";

export default function Page() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [token] = useToken();

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/chat/1/?token=" + token);

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        }

        socket.addEventListener("open", () => {
            socket.send(JSON.stringify({
                type: "message",
                message: "Hello, world!"
            }));
        }
        );

    }, []);

    return (
        <div>

        </div>
    )
}