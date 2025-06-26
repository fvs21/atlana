import { Armchair, Bike, Car, GraduationCap, Guitar, LucideProps, MapPinHouse, Pizza, Plus, Shirt, TabletSmartphone } from "lucide-react";
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
        name: 'Ropa, moda y accesorios',
        value: 'clothing',
        icon: Shirt
    },
    {
        name: 'Escolar',
        value: 'scholar',
        icon: GraduationCap
    },
    {
        name: 'Comida',
        value: 'food',
        icon: Pizza
    },
    {
        name: "Instrumentos y música",
        value: "music",
        icon: Guitar
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
    },{
        name: 'Otros',
        value: 'other',
        icon: Plus
    }
]

export default categories;