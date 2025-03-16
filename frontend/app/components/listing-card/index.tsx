import { ListingCard as ListingCardProps } from "~/types/listings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import styles from "./styles.module.scss";

export default function ListingCard({ id, title, prices, images }: ListingCardProps) {
    return (
        <Card className={styles.listingCard}>
            <div className={styles.listingImages}>
                <img className={styles.images} src={images[0]} />
            </div>
            <CardHeader className={styles.listingHeader}>
                <CardTitle className={styles.listingTitle}>{title}</CardTitle>
            </CardHeader>
            <CardContent className={styles.listingContent}>
                ${prices[0].price}
            </CardContent>
        </Card>
    )
}