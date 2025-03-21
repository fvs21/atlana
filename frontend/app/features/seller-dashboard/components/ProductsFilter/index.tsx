import { useState } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import styles from "./styles.module.scss";

const categories = ["Todos", "Ropa", "Calzado", "Accesorios"];
const statusOptions = ["Todos", "published", "draft", "outOfStock"];

type ProductsFilterProps = {
    onFilterChange: (filters: {
        searchTerm: string;
        category: string;
        status: string;
        priceMin: string;
        priceMax: string;
        stock: string;
        customizable: string;
    }) => void;
};

export default function ProductsFilter({ onFilterChange }: ProductsFilterProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCategory, setFilterCategory] = useState("Todos");
    const [filterStatus, setFilterStatus] = useState("Todos");
    const [filterPriceMin, setFilterPriceMin] = useState("");
    const [filterPriceMax, setFilterPriceMax] = useState("");
    const [filterStock, setFilterStock] = useState("Todos");
    const [filterCustomizable, setFilterCustomizable] = useState("Todos");

    // Aplicar los filtros cuando cualquier estado cambie
    const applyFilters = () => {
        onFilterChange({
            searchTerm,
            category: filterCategory,
            status: filterStatus,
            priceMin: filterPriceMin,
            priceMax: filterPriceMax,
            stock: filterStock,
            customizable: filterCustomizable,
        });
    };

    // Función para resetear todos los filtros
    const resetFilters = () => {
        setSearchTerm("");
        setFilterCategory("Todos");
        setFilterStatus("Todos");
        setFilterPriceMin("");
        setFilterPriceMax("");
        setFilterStock("Todos");
        setFilterCustomizable("Todos");

        // Aplica los filtros resetados
        onFilterChange({
            searchTerm: "",
            category: "Todos",
            status: "Todos",
            priceMin: "",
            priceMax: "",
            stock: "Todos",
            customizable: "Todos",
        });
    };

    // Actualizar filtros cuando cambia cualquier campo
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setTimeout(applyFilters, 300); // Pequeño debounce para la búsqueda
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCategory(e.target.value);
        setTimeout(applyFilters, 100);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value);
        setTimeout(applyFilters, 100);
    };

    const handleStockChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStock(e.target.value);
        setTimeout(applyFilters, 100);
    };

    const handleCustomizableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterCustomizable(e.target.value);
        setTimeout(applyFilters, 100);
    };

    const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPriceMin(e.target.value);
        setTimeout(applyFilters, 300);
    };

    const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilterPriceMax(e.target.value);
        setTimeout(applyFilters, 300);
    };

    return (
        <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Filtros</h3>
            <div className={styles.filters}>
                <div className={styles.searchContainer}>
                    <Input
                        type="text"
                        placeholder="Buscar productos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
                <div className={styles.filterRow}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Categoría</label>
                        <select
                            className={styles.filterSelect}
                            value={filterCategory}
                            onChange={handleCategoryChange}
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Estado</label>
                        <select
                            className={styles.filterSelect}
                            value={filterStatus}
                            onChange={handleStatusChange}
                        >
                            {statusOptions.map(status => (
                                <option key={status} value={status}>
                                    {status === "Todos" ? status :
                                        status === "published" ? "Publicado" :
                                            status === "draft" ? "Borrador" : "Agotado"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Stock</label>
                        <select
                            className={styles.filterSelect}
                            value={filterStock}
                            onChange={handleStockChange}
                        >
                            <option value="Todos">Todos</option>
                            <option value="En stock">En stock</option>
                            <option value="Sin stock">Sin stock</option>
                        </select>
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Personalización</label>
                        <select
                            className={styles.filterSelect}
                            value={filterCustomizable}
                            onChange={handleCustomizableChange}
                        >
                            <option value="Todos">Todos</option>
                            <option value="Customizables">Customizables</option>
                            <option value="No customizables">No customizables</option>
                        </select>
                    </div>
                </div>
                <div className={styles.filterRow}>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Precio mínimo</label>
                        <Input
                            type="number"
                            placeholder="Min"
                            value={filterPriceMin}
                            onChange={handlePriceMinChange}
                            className={styles.priceInput}
                        />
                    </div>
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Precio máximo</label>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={filterPriceMax}
                            onChange={handlePriceMaxChange}
                            className={styles.priceInput}
                        />
                    </div>
                    <div className={styles.filterActions}>
                        <Button variant="outline" size="sm" onClick={resetFilters}>
                            Limpiar filtros
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
