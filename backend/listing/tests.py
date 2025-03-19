from django.test import TestCase
from . import service
from .models import Listing, ListingPrice

# Create your tests here.
class ListingTests(TestCase):
    def test_listing_prices_validation(self):
        '''
        Test the listing prices validation algorithm
        '''

        valid_cases = [
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 6, 'max_units': 10},
                {'price': 8.0, 'min_units': 11, 'max_units': None}
            ],
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 6, 'max_units': 10},
                {'price': 8.0, 'min_units': 11, 'max_units': None}
            ],
            [
                {'price': 100.0, 'min_units': 1, 'max_units': 9},
                {'price': 90.0, 'min_units': 10, 'max_units': 99},
                {'price': 80.0, 'min_units': 100, 'max_units': 999},
                {'price': 70.0, 'min_units': 1000, 'max_units': None}
            ],
            [
                {'price': 20.0, 'min_units': 1, 'max_units': 10},
                {'price': 15.0, 'min_units': 11, 'max_units': 20},
                {'price': 10.0, 'min_units': 21, 'max_units': None}
            ]
        ]
        
        # Invalid test cases
        invalid_cases = [
            # Test case 1: Overlapping unit ranges
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 4, 'max_units': None}  # Overlaps with previous range
            ],
            
            # Test case 2: Gap in unit ranges
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 7, 'max_units': None}  # Gap between 5 and 7
            ],
            
            # Test case 3: Min units greater than max units
            [
                {'price': 10.0, 'min_units': 5, 'max_units': 1},  # Invalid range
                {'price': 9.0, 'min_units': 6, 'max_units': None}
            ],
            
            # Test case 4: Prices not decreasing with higher quantities
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 12.0, 'min_units': 6, 'max_units': None}  # Price should decrease, not increase
            ],
            # Test case 5: Negative units
            [
                {'price': 10.0, 'min_units': -1, 'max_units': None}  # Negative units not allowed
            ],
            # Test case 6: Incorrect lap between ranges
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 8, 'max_units': None}  # min_units should be 6
            ],
            # Test case 7: Duplicate range
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 9.0, 'min_units': 1, 'max_units': None}  # Duplicate range
            ],
            # Test case 8: Zero min_units
            [
                {'price': 10.0, 'min_units': 0, 'max_units': None}  # Zero min_units may be invalid
            ],
            # Test case 9: Non null max_units
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5}
            ],
            # Test case 10: Same prices
            [
                {'price': 10.0, 'min_units': 1, 'max_units': 5},
                {'price': 10.0, 'min_units': 6, 'max_units': 10},
                {'price': 10.0, 'min_units': 11, 'max_units': None}
            ],
        ]

        for i, case in enumerate(valid_cases):
            with self.subTest(case=case, description=f"Valid test case {i+1}"):
                self.assertTrue(service.validate_prices(case), f"Test case failed: {case}")

        for i, case in enumerate(invalid_cases):
            with self.subTest(case=case, description=f"Invalid test case {i+1}"):
                self.assertFalse(service.validate_prices(case), f"Test case failed: {case}")
