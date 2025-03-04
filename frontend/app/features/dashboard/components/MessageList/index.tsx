import { useState } from "react"
import type { Message } from "../../types"
import styles from "./MessageList.module.scss"

export default function MessageList({ messages }: { messages: Message[] }) {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <div
            key={message.id}
            className={`${styles.messageItem} ${selectedMessage === message.id ? styles.selected : ""}`}
            onClick={() => setSelectedMessage(message.id)}
          >
            <div className={styles.messageAvatar}>{message.sender.charAt(0)}</div>
            <div className={styles.messagePreview}>
              <div className={styles.messageHeader}>
                <span className={styles.messageSender}>{message.sender}</span>
                <span className={styles.messageDate}>{new Date(message.date).toLocaleDateString()}</span>
              </div>
              <div className={styles.messageSubject}>{message.subject}</div>
              <div className={styles.messageExcerpt}>{message.content.substring(0, 60)}...</div>
            </div>
            {!message.read && <div className={styles.unreadIndicator}></div>}
          </div>
        ))}
      </div>

      <div className={styles.messageDetail}>
        {selectedMessage ? (
          messages.find((m) => m.id === selectedMessage) ? (
            <div className={styles.messageContent}>
              <div className={styles.messageDetailHeader}>
                <h3>{messages.find((m) => m.id === selectedMessage)?.subject}</h3>
                <div className={styles.messageMeta}>
                  <div className={styles.messageSenderInfo}>
                    <div className={`${styles.messageAvatar} ${styles.large}`}>
                      {messages.find((m) => m.id === selectedMessage)?.sender.charAt(0)}
                    </div>
                    <div>
                      <div className={styles.messageSender}>
                        {messages.find((m) => m.id === selectedMessage)?.sender}
                      </div>
                      <div className={styles.messageEmail}>{messages.find((m) => m.id === selectedMessage)?.email}</div>
                    </div>
                  </div>
                  <div className={styles.messageDate}>
                    {new Date(messages.find((m) => m.id === selectedMessage)?.date || "").toLocaleString()}
                  </div>
                </div>
              </div>
              <div className={styles.messageBody}>{messages.find((m) => m.id === selectedMessage)?.content}</div>
              <div className={styles.messageActions}>
                <button className={styles.replyBtn}>Reply</button>
                <button className={styles.forwardBtn}>Forward</button>
              </div>
            </div>
          ) : (
            <div className={styles.noMessageSelected}>Message not found</div>
          )
        ) : (
          <div className={styles.noMessageSelected}>Select a message to view</div>
        )}
      </div>
    </div>
  )
}

