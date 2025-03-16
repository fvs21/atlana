import styles from "./store.module.scss";
import About from "~/features/store/components/About";

export default function Page() {
    return (
        <div className={styles.container}>
            <About />
        </div>
    )
}