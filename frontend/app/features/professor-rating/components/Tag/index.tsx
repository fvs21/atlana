import styles from "./styles.module.scss";

export default function Tag({ title }: { title: string }) {
    return (
        <div className={styles.tag}>
            {title}
        </div>
    )
}