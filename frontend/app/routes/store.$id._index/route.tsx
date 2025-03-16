import ListingCard from "~/components/listing-card";
import styles from "./store.module.scss";
import About from "~/features/store/components/About";

export default function Page() {
    return (
        <div className={styles.container}>
            <About />
            <div className={styles.popularListingsContainer}>
                <h1 className={styles.popularListingsTitle}>Productos populares de la tienda</h1>
                <ListingCard 
                    id={1}
                    title="Camisas negras de lino y algodón para hombre"
                    prices={[
                        {
                            listing_id: 1,
                            price: 300,
                            min_units: 10,
                            max_units: 20
                        }
                    ]}
                    images={[
                        "https://m.media-amazon.com/images/I/61owdlDd7wL._AC_SL1500_.jpg"
                    ]}
                />
            </div>
        </div>
    )
}