import { createContext, useState, useEffect } from "react";

export const StoreContext = createContext();

const StoreProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch products when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/products`);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Filter products when category changes
    useEffect(() => {
        if (selectedCategory) {
            const filtered = products.filter(product => product.category === selectedCategory);
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [selectedCategory, products]);

    // Function to handle category selection
    const filterByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    // Function to reset filters
    const resetFilters = () => {
        setSelectedCategory(null);
        setFilteredProducts(products);
    };

    return (
        <StoreContext.Provider
            value={{ 
                categories, 
                setCategories,
                products,
                setProducts,
                filteredProducts,
                selectedCategory,
                filterByCategory,
                resetFilters,
                loading,
                setLoading,
                error,
                setError
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};
export { StoreProvider };