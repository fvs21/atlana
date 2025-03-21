import { useState } from "react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { Button } from "~/components/ui/button";
import SellerProductCard from "~/components/seller-product-card";
import { SellerProductCard as SellerProductCardType } from "~/types/listings";
import ProductsFilter from "~/features/seller-dashboard/components/ProductsFilter";
import styles from "./styles.module.scss";
import { useNavigate } from "@remix-run/react";

// Simulando datos de productos para demostración
const mockProducts: SellerProductCardType[] = [
    { 
        id: 1, 
        name: "Camiseta Básica", 
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Camiseta de algodón 100% para uso diario, disponible en varios colores.",
        price_min: 19.99,
        price_max: 24.99,
        inventory: 45, 
        category: "Ropa", 
        status: "published",
        customizable: true,
        store_url: "/store/123/product/1"
    },
    { 
        id: 2, 
        name: "Zapatillas Deportivas", 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Zapatillas para running con suela anti-impacto y acabados premium.",
        price_min: 89.99,
        price_max: 89.99, 
        inventory: 23, 
        category: "Calzado", 
        status: "published",
        customizable: false,
        store_url: "/store/123/product/2"
    },
    { 
        id: 3, 
        name: "Bolso de Cuero", 
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Bolso hecho a mano con cuero auténtico, ideal para uso diario.",
        price_min: 59.99,
        price_max: 79.99, 
        inventory: 12, 
        category: "Accesorios", 
        status: "published",
        customizable: true,
        store_url: "/store/123/product/3"
    },
    { 
        id: 4, 
        name: "Jeans Clásicos", 
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Jeans de corte recto con detalles en los bolsillos, disponible en varios tonos.",
        price_min: 49.99,
        price_max: 59.99, 
        inventory: 0, 
        category: "Ropa", 
        status: "outOfStock",
        customizable: false,
        store_url: "/store/123/product/4"
    },
    { 
        id: 5, 
        name: "Reloj Vintage", 
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
        description: "Reloj de estilo vintage con correa de cuero y diseño minimalista.",
        price_min: 129.99,
        price_max: 149.99, 
        inventory: 8, 
        category: "Accesorios", 
        status: "draft",
        customizable: false,
        store_url: "/store/123/product/5"
    },
];

export default function Page() {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        searchTerm: "",
        category: "Todos",
        status: "Todos",
        priceMin: "",
        priceMax: "",
        stock: "Todos",
        customizable: "Todos",
    });
    
    const filteredProducts = mockProducts.filter(product => {
        // Filtrar por término de búsqueda
        const matchesSearch = product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) || 
                             product.description.toLowerCase().includes(filters.searchTerm.toLowerCase());
        
        // Filtrar por categoría
        const matchesCategory = filters.category === "Todos" || product.category === filters.category;
        
        // Filtrar por estado
        const matchesStatus = filters.status === "Todos" || product.status === filters.status;
        
        // Filtrar por rango de precios
        const matchesPriceMin = filters.priceMin === "" || product.price_min >= parseFloat(filters.priceMin);
        const matchesPriceMax = filters.priceMax === "" || product.price_max <= parseFloat(filters.priceMax);
        
        // Filtrar por disponibilidad de stock
        const matchesStock = filters.stock === "Todos" || 
                            (filters.stock === "En stock" && product.inventory > 0) ||
                            (filters.stock === "Sin stock" && product.inventory === 0);
        
        // Filtrar por personalización
        const matchesCustomizable = filters.customizable === "Todos" || 
                                  (filters.customizable === "Customizables" && product.customizable) ||
                                  (filters.customizable === "No customizables" && !product.customizable);
        
        return matchesSearch && matchesCategory && matchesStatus && 
               matchesPriceMin && matchesPriceMax && matchesStock && matchesCustomizable;
    });

    // Manejar cambios de filtros desde el componente ProductsFilter
    const handleFilterChange = (newFilters: any) => {
        setFilters(newFilters);
    };

    return (
        <div className={styles.container}>
            <div className={styles.trigger}>
                <SidebarTrigger />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Productos</h1>
                    <Button onClick={() => navigate("/create-listing")}>+ Añadir Producto</Button>
                </div>
                <div className={styles.panel}>
                    <ProductsFilter onFilterChange={handleFilterChange} />
                    <div className={styles.productGrid}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <SellerProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className={styles.emptyResults}>
                                <p>No se encontraron productos que coincidan con los filtros aplicados</p>
                                <Button 
                                    variant="outline" 
                                    onClick={() => handleFilterChange({
                                        searchTerm: "",
                                        category: "Todos",
                                        status: "Todos",
                                        priceMin: "",
                                        priceMax: "",
                                        stock: "Todos",
                                        customizable: "Todos",
                                    })}
                                >
                                    Limpiar filtros
                                </Button>
                            </div>
                        )}
                    </div>
                    
                    <div className={styles.pagination}>
                        <p className={styles.paginationInfo}>Mostrando {filteredProducts.length} de {mockProducts.length} productos</p>
                        <div className={styles.paginationButtons}>
                            <Button variant="outline" size="sm" disabled>Anterior</Button>
                            <Button variant="outline" size="sm" disabled>Siguiente</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}