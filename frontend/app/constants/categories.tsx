import { Armchair, Bike, Car, Dumbbell, GraduationCap, House, LucideProps, MapPinHouse, Shirt, Tablet, TabletSmartphone } from "lucide-react";

type Category = {
    name: string;
    value: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>;
};

const categories: Category[] = [
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
        name: 'Departamentos',
        value: 'departments',
        icon: MapPinHouse
    }
]

export default categories;