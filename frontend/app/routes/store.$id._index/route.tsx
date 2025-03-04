import Header from "~/features/store/components/Header";
import styles from "./store.module.scss";
import Menubar from "~/features/store/components/MenuBar";
import About from "~/features/store/components/About";

export default function Page() {
    return (
        <div className={styles.container}>
            <img className={styles.bannerImage} src="https://static.vecteezy.com/system/resources/previews/003/566/561/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg" />
            <Header companyName="Precision Manufacturing Co." />
            <Menubar />
            <main>
                <About />
            </main>
            <footer>
                <p>© {new Date().getFullYear()} Precision Manufacturing Co. All rights reserved.</p>
            </footer>
        </div>
    )
}