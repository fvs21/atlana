import { ListingCard as ListingCardProps } from "~/types/listings";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import styles from "./styles.module.scss";
import { Button } from "../ui/button";
import { Link, useNavigate } from "@remix-run/react";
import ListingCardImages from "./ListingCardImages";

export default function ListingCard({ id, title, price, images_urls, creator }: ListingCardProps) {
    const navigate = useNavigate();

    const addToCart = (e: React.MouseEvent) => {
        e.preventDefault();
    }

    return (
        <a href={`/listing/${id}`} target="_blank">
            <Card className={styles.listingCard}>
                <div className={styles.listingImages}>
                    <ListingCardImages images={images_urls} />
                </div>
                <CardHeader className={styles.listingHeader}>
                    <CardTitle className={styles.listingTitle}>{title}</CardTitle>
                </CardHeader>
                <CardContent className={styles.listingContent}>
                    <div className={styles.price}>
                        ${price}
                    </div>
                    <button className={styles.creator}>
                        {creator.name}
                    </button>
                </CardContent>
                <CardFooter className={styles.listingFooter}>
                    <Button className={styles.sendInquiryButton} onClick={addToCart}>
                        Comprar
                    </Button>
                </CardFooter>
            </Card>
        </a>
    )
}