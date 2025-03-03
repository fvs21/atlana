import styles from "./navbar-filters.module.scss";
import { useState } from "react";

export default function CategoriesFilter() {
    const [selectedParentCategory, setSelectedParentCategory] = useState<number>(0);
    return (
        <div className={styles.categoriesFilter}>
            <div className={styles.categoriesContainer}>
                <div className={styles.parentCategories}>
                    <ParentCategory 
                        name="Categorías principales"
                        selected={selectedParentCategory == 0}
                        select={() => setSelectedParentCategory(0)}
                    />
                    <ParentCategory 
                        name="Hogar" 
                        selected={selectedParentCategory == 1}
                        select={() => setSelectedParentCategory(1)}
                    />
                    <ParentCategory 
                        name="Industrial" 
                        selected={selectedParentCategory == 2}
                        select={() => setSelectedParentCategory(2)}
                    />
                    <ParentCategory 
                        name="Moda"
                        selected={selectedParentCategory == 3}
                        select={() => setSelectedParentCategory(3)}
                    />
                    <ParentCategory 
                        name="Autopartes" 
                        selected={selectedParentCategory == 4}
                        select={() => setSelectedParentCategory(4)}
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
            Categoría
        </button>
    )
}