import { ListingCard as ListingCardProps } from "~/types/listings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";
import { Link } from "@remix-run/react";
import ListingCardImages from "./ListingCardImages";

export default function ListingCard({ id, title, prices, images, creator, ready_to_ship }: ListingCardProps) {

    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    const sendInquiry = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <a href={`/listing/${id}`} target="_blank">
            <Card className={styles.listingCard}>
                <div className={styles.listingImages}>
                    <ListingCardImages images={images} />
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
                    <Link to={"/store/" + creator.id} className={styles.creator}>
                        {creator.name}
                    </Link>
                </CardContent>
                <CardFooter className={styles.listingFooter}>
                    {ready_to_ship && (
                        <Button className={styles.sendInquiryButton} onClick={addToCart}>
                            Agregar al carrito
                        </Button>
                    )}
                    <Button className={styles.sendInquiryButton} onClick={sendInquiry}>
                        Cotiza
                    </Button>
                </CardFooter>
            </Card>
        </a>
    )
}