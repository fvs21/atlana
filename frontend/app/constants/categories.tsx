import { Car, Dumbbell, House, Shirt, Tablet } from "lucide-react";

export type ParentCategory = 'top' | 'home' | 'industrial' | 'fashion' | 'auto';

type Categories = {
    [key in ParentCategory]: {
        name: string,
        icon: any
    }[]
};

const categories: Categories = {
    'top': [
        {
            'name': 'Electrónicos',
            'icon': <Tablet size={18} />
        },
        {
            'name': 'Hogar y Jardín',
            'icon': <House size={18}/>
        },
        {
            'name': 'Deportes',
            'icon': <Dumbbell size={18}/>
        },
        {
            'name': 'Moda y Belleza',
            'icon': <Shirt size={18}/>
        },
        {
            'name': 'Autopartes',
            'icon': <Car size={18}/>
        }
    ],
    'home': [

    ],
    'industrial': [

    ],
    'fashion': [],
    'auto': []
};

export default categories;