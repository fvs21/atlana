import { Listing as ListingType } from "~/types/listings";
import styles from "./styles.module.scss";
import ListingImages from "~/components/listing-images";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { formatTimeSinceUploaded } from "../../utils/listing";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Bookmark, MessageCircle } from "lucide-react";

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
                    <div className={styles.descriptionContainer}>
                        <h2 className={styles.descriptionTitle}>Descripción</h2>
                        <p className={styles.description}>{description}</p>
                    </div>
                    <hr className="mt-4"/>
                    <div className={styles.creatorContainer}>
                        <div className={styles.datePublished}>
                            Publicado {formatTimeSinceUploaded(created_at)} por:
                        </div>
                        <div className={styles.creator}>
                            <div className={styles.creatorPfpContainer}>
                                <img className={styles.creatorPfp} src={creator.profile_picture} alt="Creator profile" />
                            </div>
                            <div className={styles.creatorNameContainer}>
                                <Link to={"/profile/" + creator.id} className={styles.creatorName}>{creator.name}</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.actionsContainer}>
                        <Button className="primaryButton">
                            <MessageCircle />
                            Enviar mensaje
                        </Button>
                        <Button className="primaryButton">
                            <Bookmark />
                            Guardar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )

}