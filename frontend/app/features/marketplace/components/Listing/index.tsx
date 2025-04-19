import { Listing as ListingType } from "~/types/listings";
import styles from "./styles.module.scss";
import ListingImages from "~/components/listing-images";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { formatTimeSinceUploaded } from "../../utils/listing";

export default function Listing({
    id,
    title,
    description,
    price,
    images_urls,
    creator,
    category,
    created_at
}: ListingType) {
    return (
        <div className={styles.listingContainer}>
            <div className={styles.topLinks}>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/marketplace">Marketplace</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={"/marketplace/" + category}>{category}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/listing/${id}`}>{title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={styles.listing}>
                <div className={styles.imagesContainer}>
                    <ListingImages
                        images={images_urls}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>MXN ${price}</span>
                    </div>
                    <div className={styles.description}>
                        {description}
                    </div>
                    <div className={styles.creatorContainer}>
                        <div className={styles.datePublished}>
                            Publicado {formatTimeSinceUploaded(created_at)} por:
                        </div>
                        <div className={styles.creator}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}