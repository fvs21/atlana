import { useState } from "react"
import styles from "./styles.module.scss"

type Category = {
    id: number
    name: string
    featured: boolean
}


export default function CategoriesSetup({ edit, save }: { edit: boolean; save: () => void }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    const handleToggleFeatured = (id: number) => {
        setCategories((prev) =>
            prev.map((category) => (category.id === id ? { ...category, featured: !category.featured } : category)),
        )
    }

    const handleDeleteCategory = (id: number) => {
        setCategories((prev) => prev.filter((category) => category.id !== id))
    }

    const handleAddCategory = () => {
        if (newCategoryName.trim() === "") return

        const newCategory: Category = {
            id: Date.now(), // Simple way to generate a unique ID
            name: newCategoryName,
            featured: false,
        }

        setCategories((prev) => [...prev, newCategory])
        setNewCategoryName("")
    }

    return (
        <div className={styles.categoriesSetup}>
            <div className={styles.addCategory}>
                <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="New category name"
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>

            <div className={styles.categoriesList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Category Name</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <label className={styles.switch}>
                                        <input
                                            type="checkbox"
                                            checked={category.featured}
                                            onChange={() => handleToggleFeatured(category.id)}
                                        />
                                        <span className={styles.slider}></span>
                                    </label>
                                </td>
                                <td>
                                    <button className={styles.deleteButton} onClick={() => handleDeleteCategory(category.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.preview}>
                <h3>Featured Categories Preview</h3>
                <div className={styles.featuredCategories}>
                    {categories
                        .filter((category) => category.featured)
                        .map((category) => (
                            <div key={category.id} className={styles.categoryCard}>
                                {category.name}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

