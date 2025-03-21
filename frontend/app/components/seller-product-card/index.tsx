import { Link } from "@remix-run/react";
import { Edit, Eye } from "lucide-react";
import { SellerProductCard as SellerProductCardProps } from "~/types/listings";
import styles from "./styles.module.scss";

export default function SellerProductCard({ product }: { product: SellerProductCardProps }) {
    const getStatusLabel = (status: 'published' | 'draft' | 'outOfStock') => {
        switch(status) {
            case 'published': return 'Publicado';
            case 'draft': return 'Borrador';
            case 'outOfStock': return 'Agotado';
            default: return status;
        }
    };

    const getStatusClass = (status: 'published' | 'draft' | 'outOfStock') => {
        switch(status) {
            case 'published': return styles.statusPublished;
            case 'draft': return styles.statusDraft;
            case 'outOfStock': return styles.statusOutOfStock;
            default: return '';
        }
    };

    return (
        <div className={styles.productCard}>
            <div className={styles.productImageContainer}>
                <img src={product.image} alt={product.name} className={styles.productImage} />
                <span className={`${styles.productStatus} ${getStatusClass(product.status)}`}>
                    {getStatusLabel(product.status)}
                </span>
            </div>
            <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productMeta}>
                    <div className={styles.productPrice}>
                        {product.price_min === product.price_max ? (
                            <span>${product.price_min.toFixed(2)}</span>
                        ) : (
                            <span>${product.price_min.toFixed(2)} - ${product.price_max.toFixed(2)}</span>
                        )}
                    </div>
                    <div className={styles.productInventory}>
                        Stock: <strong>{product.inventory}</strong>
                    </div>
                </div>
                <div className={styles.productCategory}>
                    <span>{product.category}</span>
                    {product.customizable && (
                        <span className={styles.customizableBadge}>Personalizable</span>
                    )}
                </div>
                <div className={styles.productActions}>
                    <Link to={`/seller/products/edit/${product.id}`} className={styles.editButton}>
                        <Edit size={16} />
                        <span>Editar</span>
                    </Link>
                    <Link to={product.store_url} className={styles.viewButton} target="_blank">
                        <Eye size={16} />
                        <span>Ver en tienda</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
