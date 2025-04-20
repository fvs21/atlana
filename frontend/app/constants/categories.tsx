import { Armchair, Bike, Car, Dumbbell, GraduationCap, House, LucideProps, MapPinHouse, Shirt, Tablet, TabletSmartphone } from "lucide-react";
import { Category } from "~/types/listings";

type CategoryObject = {
    name: string;
    value: Category;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
};

const categories: CategoryObject[] = [
    {
        name: 'Electrónicos',
        value: 'electronics',
        icon: TabletSmartphone
    },
    {
        name: 'Ropa',
        value: 'clothes',
        icon: Shirt
    },
    {
        name: 'Escolar',
        value: 'scholar',
        icon: GraduationCap
    },
    {
        name: 'Deportes',
        value: 'sports',
        icon: Bike
    },
    {
        name: 'Muebles',
        value: 'furniture',
        icon: Armchair
    },
    {
        name: 'Vehículos',
        value: 'vehicles',
        icon: Car
    },
    {
        name: 'Renta de propiedades',
        value: 'property_rentals',
        icon: MapPinHouse
    }
]

export default categories;