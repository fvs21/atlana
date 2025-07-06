import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { ArrowRight } from "lucide-react";
import styles from "./index.module.scss"
import Footer from "~/components/footer";
import { Link } from "@remix-run/react";
import { useUser } from "~/api/client.auth";
import { onlyGuests } from "~/api/server.auth";
import { cn } from "~/lib/utils";
import NavbarSmall from "~/components/navbar-small";

export const meta: MetaFunction = () => {
  return [
    { title: "Atlana: Compra y venta de artículos" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  onlyGuests({ request });

  return null;
}

export default function Index() {
  const { user, isLoading } = useUser();

  return (
    <>
      <NavbarSmall />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1>Vende y compra en la universidad</h1>
              <p>Disponible ahora para estudiantes de la Anáhuac Mayab</p>
              <Link to={!!user ? "/marketplace" : "login"} className={`${styles.button} ${styles.buttonPrimary}`}>
                Buscar
                <ArrowRight />
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.information}>
          <div className={styles.informationSection}>
            <img className={styles.informationImage} src="/music.png" />
            <div className={styles.informationContent}>
              <h2 className={styles.informationContentTitle}>Compra y vende</h2>
              Atlana es un marketplace exclusivo para estudiantes. Nuestra plataforma permite comprar y vender artículos de manera segura y sencilla dentro de una comunidad confiable, fomentando la economía circular y el ahorro entre la comunidad estudiantil.
            </div>
          </div>
          <div className={cn(styles.informationSection, styles.informationSectionReverse)}>
            <img className={styles.informationImage} src="/selling.png" />
            <div className={styles.informationContent}>
              <h2 className={styles.informationContentTitle}>¿Cómo funciona?</h2>
              <ol className={styles.informationList}>
                <li>Regístrate y verifícate en la plataforma con tu correo institucional (anahuacmayab.edu.mx o anahuac.mx)</li>
                <li>Publica artículos o busca por categorías</li>
                <li>Conecta con vendedores o compradores por mensaje</li>
                <li>Reúnete seguramente y completa la compra</li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
