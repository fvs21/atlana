import Header from "~/features/store/components/Header";
import styles from "./store.module.scss";
import Menubar from "~/features/store/components/MenuBar";
import About from "~/features/store/components/About";
import { useMatches } from "@remix-run/react";
import { Store } from "~/types/globals";

export default function Page() {
    const matches = useMatches();
    const data = matches.find(match => match.id === "routes/store.$id")?.data as Store;    

    return (
        <div className={styles.container}>
            <div className={styles.bannerImageContainer}>
                <img className={styles.bannerImage} src="https://static.vecteezy.com/system/resources/previews/003/566/561/non_2x/abstract-banner-design-web-templates-horizontal-header-web-banner-modern-abstract-cover-header-background-for-website-design-social-media-cover-advertising-banner-flyer-invitation-card-free-vector.jpg" />
            </div>
            <Header companyName={data.name} />
            <Menubar />
            <About />
        </div>
    )
}