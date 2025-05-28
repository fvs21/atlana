import { ListingCard as ListingCardProps } from "~/types/listings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./styles.module.scss";
import ListingCardImages from "./ListingCardImages";
import { Archive } from "lucide-react";

export default function ListingCard({ id, title, price, images_urls, creator, archived = false }: ListingCardProps) {
    return (
        <a href={`/listing/${id}`} target="_blank">
            <Card className={styles.listingCard}>
                <div className={styles.listingImages}>
                    <ListingCardImages images={images_urls} />
                </div>
                <CardHeader className={styles.listingHeader}>
                    <CardTitle className={styles.listingPrice}>
                        ${Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)}
                        {archived && <Archive size={18} color="gray"/>}
                    </CardTitle>
                </CardHeader>
                <CardContent className={styles.listingContent}>
                    <div className={styles.listingTitle}>
                        {title}
                    </div>
                    <button className={styles.creator}>
                        {creator.name}
                    </button>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
        </a>
    )
}