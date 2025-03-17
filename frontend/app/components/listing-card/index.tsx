import { ListingCard as ListingCardProps } from "~/types/listings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";

export default function ListingCard({ id, title, prices, images, creator, ready_to_ship }: ListingCardProps) {
    return (
        <Card className={styles.listingCard}>
            <div className={styles.listingImages}>
                <img className={styles.images} src={images[0]} />
            </div>
            <CardHeader className={styles.listingHeader}>
                <CardTitle className={styles.listingTitle}>{title}</CardTitle>
            </CardHeader>
            <CardContent className={styles.listingContent}>
                <div className={styles.price}>
                    ${prices[0].price}-440
                </div>
                <div className={styles.minOrder}>
                    Orden mínima: 5 piezas
                </div>
                <div className={styles.unitsSold}>
                    1000 vendidos
                </div>
                <div className={styles.creator}>
                    {creator.name}
                </div>
            </CardContent>
            <CardFooter className={styles.listingFooter}>
                {ready_to_ship && (
                    <Button className={styles.sendInquiryButton}>
                        Agregar al carrito
                    </Button>
                )}
                <Button className={styles.sendInquiryButton}>
                    Cotiza
                </Button>
            </CardFooter>
        </Card>
    )
}