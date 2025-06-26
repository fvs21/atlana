import { useGetChat } from '~/features/chat/api';
import styles from './styles.module.scss';
import { useParams } from '@remix-run/react';
import ChatHeader from '~/features/chat/components/ChatHeader';
import Chat from '~/features/chat/components/Chat';
import LoadingScreen from '~/components/loading-screen';

export default function Page() {
    const { chat_id } = useParams();

    const { data, isLoading, isError, isFetching } = useGetChat(Number(chat_id));

    const chat = data?.chat;
    const messages = data?.messages;

    if (isError) {
        return <div className='flex justify-center items-center w-full'>El chat que buscas no existe</div>;
    }

    return (
        <div className={styles.chatContainer}>
            {!isLoading && (
                <ChatHeader
                    chat_name={chat?.participants[0].full_name!}
                    chat_picture={chat?.participants[0].profile_picture_url!}
                    chat_id={chat?.id!}
                    receiver_id={chat?.participants[0].id!}
                />
            )}
            {(isLoading || isFetching && !isError) ? (
                <LoadingScreen />
            ) : (
                <Chat messages={messages!} />
            )}
        </div>
    )
}