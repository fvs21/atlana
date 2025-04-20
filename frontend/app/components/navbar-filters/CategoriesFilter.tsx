import categories from "~/constants/categories";
import styles from "./navbar-filters.module.scss";
import { useState } from "react";
import { Link } from "@remix-run/react";

export default function CategoriesFilter() {
    const [selectedParentCategory, setSelectedParentCategory] = useState('top');

    return (
        <div className={styles.categoriesFilter}>
            <div className={styles.categoriesContainer}>
                <div className={styles.parentCategories}>
                    {categories.map((category) => (
                        <Category 
                            key={category.name}
                            name={category.name}
                            value={category.value}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export function Category({ name, value }: { name: string, value: string }) {
    return (
        <Link 
            className={`${styles.parentCategory}`}
            to={`/marketplace/${value}`}
        >
            {name}
        </Link>
    )
}
