from typing import Dict, List, Optional
from django.core.files.uploadedfile import UploadedFile
from listing.exceptions import ListingOptionsException, ListingPricesException
from listing.models import Listing, ListingColor, ListingImage, ListingOptions, ListingPrice, ListingSize, ListingSizeSpecification
from image.service import upload_image
from store.models import Store

def validate_prices(prices: List[Dict]) -> bool:
    """
    Validate that the prices are in the correct order and that the min_units are less than the max_units.
    Ensure that the last price has a max_units of None.
    """

    for i in range(len(prices)):
        if prices[i]['price'] <= 0 or prices[i]['min_units'] <= 0:
            return False
        
        if(i == len(prices) - 1):
            if 'max_units' in prices[i]:
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

def create_listing_prices(listing: Listing, prices: List[dict]) -> List[ListingPrice]:
    #sort the prices by minimum number of units to validate and ensure that the prices are created in the correct order
    prices.sort(key=lambda price: price['min_units'])

    if not validate_prices(prices):
        raise ListingPricesException()

    listing_prices = ListingPrice.objects.bulk_create([
        ListingPrice(
            listing=listing,
            price=price['price'],
            min_units=price['min_units'],
            max_units=price.get('max_units', None)
        ) for price in prices
    ])

    return listing_prices

def create_listing_options(listing: Listing, options: dict, color_images: Optional[List[UploadedFile]]) -> ListingOptions:
    created_options = {}

    if 'colors' in options:
        colors = options['colors']

        created_colors = []

        for color in colors:
            if not color.get('color_code') and not color.get('image_index'):
                raise ListingOptionsException()

            if 'image_index' in color:
                if not color_images or color['image_index'] >= len(color_images):
                    raise ListingOptionsException()
                
                image = upload_image(color_images[color['index']], 'listing-options')

                created_color = ListingColor.objects.create(
                    image=image,
                    color_name=color['color_name']
                )

                created_colors.append(created_color)
            else:
                created_color = ListingColor.objects.create(
                    color_code=color['color_code'],
                    color_name=color['color_name']
                )

                created_colors.append(created_color)

        created_options['colors'] = created_colors

    if 'sizes' in options:
        sizes = options['sizes']

        created_sizes = []

        for size in sizes:
            created_size = ListingSize.objects.create(
                size=size['size']
            )

            if 'specifications' in size:
                specifications = size['specifications']

                created_specifications = ListingSizeSpecification.objects.create(**specifications)

                created_size.specifications = created_specifications
                created_size.save()

            created_sizes.append(created_size)

        created_options['sizes'] = created_sizes

    listing_options = ListingOptions.objects.create(listing=listing)
    listing_options.colors.set(created_options.get('colors', []))
    listing_options.sizes.set(created_options.get('sizes', []))

    return listing_options

def create_listing(store: Store, body: dict, images: List[UploadedFile]) -> Listing:
    """
    Create a listing with the given body and images.
    """

    listing = Listing.objects.create(
        store=store,
        title=body['title'],
        description=body['description'],
        customizable=body['customizable'],
        ready_to_ship=body['ready_to_ship'],
        category=body['category']
    )

    create_listing_prices(listing, body['prices'])

    if body['customizable']:
        create_listing_options(listing, body['custom_options'], body['color_images'])

    images = [upload_image(image, 'listing') for image in images]

    ListingImage.objects.bulk_create([
        ListingImage(
            listing=listing,
            image=image
        ) for image in images
    ])

    return listing