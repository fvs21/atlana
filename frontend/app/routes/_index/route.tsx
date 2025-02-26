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
              <h1>Discover Your Style</h1>
              <p>Shop the latest trends in fashion with our curated collection</p>
              <button className={`${styles.button} ${styles.buttonPrimary}`}>
                Shop Now
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
              <h3>Easy Returns</h3>
              <p>30-day return policy</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.icon}>🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure checkout</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.icon}>💎</div>
              <h3>Quality Products</h3>
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
