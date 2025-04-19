import styles from "./navbar-filters.module.scss";
import { useState } from "react";

export default function CategoriesFilter() {
    const [selectedParentCategory, setSelectedParentCategory] = useState('top');

    return (
        <div className={styles.categoriesFilter}>
            <div className={styles.categoriesContainer}>
                <div className={styles.parentCategories}>
                    <ParentCategory 
                        name="Categorías principales"
                        selected={selectedParentCategory == 'top'}
                        select={() => setSelectedParentCategory('top')}
                    />
                    <ParentCategory 
                        name="Hogar" 
                        selected={selectedParentCategory == 'home'}
                        select={() => setSelectedParentCategory('home')}
                    />
                    <ParentCategory 
                        name="Industrial" 
                        selected={selectedParentCategory == 'industrial'}
                        select={() => setSelectedParentCategory('industrial')}
                    />
                    <ParentCategory 
                        name="Textiles"
                        selected={selectedParentCategory == 'textile'}
                        select={() => setSelectedParentCategory('textile')}
                    />
                    <ParentCategory 
                        name="Autopartes" 
                        selected={selectedParentCategory == 'auto'}
                        select={() => setSelectedParentCategory('auto')}
                    />
                </div>
                <div className={styles.categories}>
                    
                </div>
            </div>
        </div>
    )
}

export function ParentCategory({ name, selected, select }: { name: string, selected: boolean, select: () => void }) {
    return (
        <button 
            className={`${styles.parentCategory} ${selected ? styles.selected : ""}`}
            onMouseEnter={select}
        >
            {name}
        </button>
    )
}

export function Category({ name, selected, icon }: { name: string, selected: boolean, icon: any }) {
    return (
        <button className={styles.category}>
            {icon}
            <div>{name}</div>
        </button>
    )
}