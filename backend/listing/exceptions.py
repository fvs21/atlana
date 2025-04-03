from backend.exceptions import DefaultException

class ListingPricesException(DefaultException):
    code = "invalid_price_structure"

    def __init__(self, detail="Invalid prices for listing", status_code=404):
        super().__init__(detail, status_code, self.code)

class ListingOptionsException(DefaultException):
    code = "invalid_options_structure"

    def __init__(self, detail="Invalid options for listing", status_code=404):
        super().__init__(detail, status_code, self.code)