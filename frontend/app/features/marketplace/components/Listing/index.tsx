import { Listing as ListingType, PropertyListing } from "~/types/listings";
import styles from "./styles.module.scss";
import ListingImages from "~/components/listing-images";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { formatPropertyListingPriceTimeUnit, formatTimeSinceUploaded } from "../../utils/listing";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Bed, Bookmark, House, MessageCircle, ShowerHead } from "lucide-react";
import categories from "~/constants/categories";
import { PropertyTypes } from "~/constants/property";
import LocationDisplay from "./LocationDisplay.client";
import { ClientOnly } from "remix-utils/client-only";
import ListingActions from "../ListingActions";
import { useUser } from "~/api/client.auth";

export default function Listing({ listing }: { listing: ListingType | PropertyListing }) {
    const isProperty = listing.category == "property_rentals";
    const category_name = categories.find((cat) => cat.value === listing.category)?.name;

    const { user, isLoading } = useUser();

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
                            <BreadcrumbLink href={"/marketplace/" + listing.category}>{category_name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href={`/listing/${listing.id}`}>{listing.title}</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className={styles.listing}>
                <div className={styles.imagesContainer}>
                    <div className="sticky top-32">
                        <ListingImages
                            images={listing.images_urls}
                        />
                    </div>
                </div>
                <div className={styles.infoContainer}>
                    <h1 className={styles.title}>{listing.title}</h1>
                    <div className={styles.priceContainer}>
                        <span className={styles.price}>
                            MXN ${Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(listing.price)}
                            {isProperty && <span className={styles.priceUnit}> {formatPropertyListingPriceTimeUnit((listing as PropertyListing).property.time_unit)}</span>}
                        </span>
                    </div>
                    <div className={styles.descriptionContainer}>
                        <h2 className={styles.descriptionTitle}>Descripción</h2>
                        <p className={styles.description}>{listing.description}</p>
                    </div>
                    <hr className="my-4" />
                    {isProperty && (
                        <>
                            <div className={styles.propertyAttributesContainer}>
                                <div className={styles.propertyAttribute}>
                                    <House color="gray" />
                                    {PropertyTypes.find((type) => type.value === (listing as PropertyListing).property.property_type)?.name}
                                </div>
                                <div className={styles.propertyAttribute}>
                                    <Bed color="gray" />
                                    {(listing as PropertyListing).property.bedrooms} {(listing as PropertyListing).property.bedrooms == 1 ? "habitación" : "habitaciones"}
                                </div>
                                <div className={styles.propertyAttribute}>
                                    <ShowerHead color="gray" />
                                    {(listing as PropertyListing).property.bathrooms} {(listing as PropertyListing).property.bathrooms == 1 ? "baño" : "baños"}
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className={styles.propertyLocationContainer}>
                                <ClientOnly>
                                    {() => <LocationDisplay location={(listing as PropertyListing).property.location} />}
                                </ClientOnly>
                            </div> 
                        </>
                    )}
                    <div className={styles.creatorContainer}>
                        <div className={styles.datePublished}>
                            Publicado {formatTimeSinceUploaded(listing.created_at)} por:
                        </div>
                        <div className={styles.creator}>
                            <div className={styles.creatorPfpContainer}>
                                <img className={styles.creatorPfp} src={listing.creator.profile_picture} alt="Creator profile" />
                            </div>
                            <div className={styles.creatorNameContainer}>
                                <Link to={"/profile/" + listing.creator.id} className={styles.creatorName}>{listing.creator.name}</Link>
                            </div>
                        </div>
                    </div>
                    {!isLoading && (
                        listing.creator.id != user?.id && (
                            <ListingActions 
                                listing_id={listing.id}
                                creator_id={listing.creator.id}
                            />
                        )
                    )}
                </div>
            </div>
        </div>
    )

}