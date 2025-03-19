from django.core.files.uploadedfile import UploadedFile
from listing.models import Listing, ListingImage, ListingPrice
from image.service import upload_image
from store.models import Store

def validate_prices(prices: list[dict]) -> bool:
    """
    Validate that the prices are in the correct order and that the min_units are less than the max_units.
    Ensure that the last price has a max_units of None.
    """

    for i in range(len(prices)):
        if prices[i]['price'] <= 0 or prices[i]['min_units'] <= 0:
            return False
        
        if(i == len(prices)-1):
            if prices[i]['max_units'] is not None:
                return False
            break
        
        if prices[i]['max_units'] <= 0:
            return False
        
        if prices[i]['max_units'] is None:
            return False
         
        if prices[i+1]['price'] >= prices[i]['price']:
            return False

        if prices[i]['min_units'] > prices[i]['max_units']:
            return False
        
        if prices[i]['max_units'] >= prices[i+1]['min_units']:
            return False
        
        if abs(prices[i]['max_units'] - prices[i+1]['min_units']) != 1:
            return False

    return True

def create_listing_prices(listing: Listing, prices: list[dict]) -> list[ListingPrice]:
    #sort the prices by minimum number of units to validate and ensure that the prices are created in the correct order
    prices.sort(key=lambda price: price['min_units'])

    if not validate_prices(prices):
        #raise exception
        pass

    listing_prices = ListingPrice.objects.bulk_create([
        ListingPrice(
            listing=listing,
            price=price['price'],
            min_units=price['min_units'],
            max_units=price['max_units']
        ) for price in prices
    ])

    return listing_prices

def create_listing(store: Store, body: dict, images: list[UploadedFile]) -> Listing:
    """
    Create a listing with the given body and images.
    """

    listing = Listing.objects.create(
        store=store,
        title=body['title'],
        description=body['description'],
        customizable=body['customizable'],
        ready_to_ship=body['ready_to_ship'],
    )
    uploaded_images = [upload_image(image, 'listing') for image in images]

    ListingImage.objects.bulk_create([
        ListingImage(listing=listing, image=image) for image in uploaded_images
    ])

    create_listing_prices(listing, body['prices'])

    return listing