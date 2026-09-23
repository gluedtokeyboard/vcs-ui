import styles from './MessagePanel.module.css'

type MessagePanelProps = { message: string }

export default function MessagePanel({ message }: MessagePanelProps) {
    return <div className={styles.messagePanel}>{message}</div>
}
