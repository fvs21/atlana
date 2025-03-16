import { cn } from "~/lib/utils";
import AboutSetup from "../AboutSetup";
import BannerSetup from "../BannerSetup";
import CategoriesSetup from "../CategoriesSetup";
import styles from "./styles.module.scss";
import { useState } from "react";
import { Link } from "@remix-run/react";
import { Dot } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";

type NowEditing = 'banner' | 'about' | 'categories' | 'none';

export default function StoreSetup() {
    const [nowEditing, setNowEditing] = useState<NowEditing>('none');

    return (
        <main className={styles.main}>
            <Header />
            <div className={styles.title}>
                <div>Configuración de tienda</div>
                <Dot />
                <Link to={'/store/1'} className={styles.visitStoreLink}>
                    Visita tu tienda
                </Link>
            </div>
            <div className={styles.setupSection}>
                <div className={cn(styles.setupSectionTitleContainer, !['banner', 'none'].includes(nowEditing) ? styles.notEditable : '')}>
                    <h2 className={styles.setupSectionTitle}>
                        Banner
                    </h2>
                    <EditButton section="banner" setNowEditing={setNowEditing} nowEditing={nowEditing} />
                </div>
                <BannerSetup edit={nowEditing == 'banner'} />
            </div>
            <div className={cn(styles.setupSection, !['about', 'none'].includes(nowEditing) ? styles.notEditable : '')}>
                <div className={styles.setupSectionTitleContainer}>
                    <h2 className={styles.setupSectionTitle}>
                        Acerca de tu tienda
                    </h2>
                    <EditButton section="about" setNowEditing={setNowEditing} nowEditing={nowEditing} />
                </div>
                <AboutSetup edit={nowEditing == 'about'}/>
            </div>
            <div className={cn(styles.setupSection, !['categories', 'none'].includes(nowEditing) ? styles.notEditable : '')}>
                <div className={styles.setupSectionTitleContainer}>
                    <h2 className={styles.setupSectionTitle}>
                        Información de productos principales
                    </h2>
                    <EditButton section="categories" setNowEditing={setNowEditing} nowEditing={nowEditing} />
                </div>
                <CategoriesSetup />
            </div>
        </main>
    );
} 

function Header() {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/seller">Panel de vendedor</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Configuración de tienda</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

function EditButton({ section, setNowEditing, nowEditing }: { section: NowEditing, setNowEditing: (section: NowEditing) => void, nowEditing: NowEditing }) {
    return (
        <button className={styles.editButton} onClick={() => {
            if(section == nowEditing) {
                setNowEditing('none');
            } else {
                setNowEditing(section);
            }
        }}>
            {nowEditing == section ? 'Cancelar' : 'Editar'}
        </button>
    )

}