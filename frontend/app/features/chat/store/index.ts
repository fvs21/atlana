import { atom, useAtom } from "jotai";

const userChatsSocket = atom<WebSocket>();

const useUserChatsSocket = () => {
    return useAtom(userChatsSocket);
}

export {
    useUserChatsSocket,
    userChatsSocket
}
