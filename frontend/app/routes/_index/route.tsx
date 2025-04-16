import type { MetaFunction } from "@remix-run/node";
import { ArrowRight } from "lucide-react";
import Navbar from "~/components/navbar";
import styles from "./index.module.scss"
import Footer from "~/components/footer";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Tradenal: Manufacturas y proveedores" },
  ];
};

export default function Index() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroContent}>
              <h1>Vende y compra de segunda mano</h1>
              <p>En tu comunidad universitaria</p>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                Buscar
                <ArrowRight />
              </button>
            </div>
            <div className={styles.heroImage}>
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Fashion Collection"
                width={600}
                height={600}
              />
            </div>
          </div>
        </section>
        <section className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.icon}>🚚</div>
              <h3>Free Shipping</h3>
              <p>On orders over $50</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.icon}>↩️</div>
              <h3>Devoluciones sencillas</h3>
              <p>30-day return policy</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.icon}>🔒</div>
              <h3>Pagos seguros</h3>
              <p>Sesión de pago 100% segura con Stripe</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.icon}>💎</div>
              <h3>Productos de calidad</h3>
              <p>Curated selection</p>
            </div>
          </div>
        </section>

        <section className={styles.categories}>
          <div className={styles.categoryContainer}>
            <h2 className={styles.categoryTitle}>Shop by Category</h2>
            <div className={styles.categoryGrid}>
              {["Women", "Men", "Accessories", "Shoes"].map((category) => (
                <Link to={`/category/${category.toLowerCase()}`} key={category} className={styles.categoryCard}>
                  <img src={`/placeholder.svg?height=300&width=300`} alt={category} width={300} height={300} />
                  <h3>{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
