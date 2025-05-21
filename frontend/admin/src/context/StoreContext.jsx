import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

    // Common headers for all requests
    const   getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    });

    // Fetch products
    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
                headers: getHeaders()
            });
            const data = await response.json();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/users`, {
                headers: getHeaders()
            });
            const data = await response.json();
            console.log(response);
            console.log(data);
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
            console.error('Error fetching users:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch categories
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories`, {
                headers: getHeaders()
            });
            const data = await response.json();
            setCategories(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch categories');
            console.error('Error fetching categories:', err);
        } finally {
            setLoading(false);
        }
    };

    // Add new product
    const addProduct = async (productData) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(productData),
            });
            const newProduct = await response.json();
            setProducts(prev => [...prev, newProduct]);
            setError(null);
            return newProduct;
        } catch (err) {
            setError('Failed to add product');
            console.error('Error adding product:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Add new category
    const addCategory = async (categoryData) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(categoryData),
            });
            const newCategory = await response.json();
            setCategories(prev => [...prev, newCategory]);
            setError(null);
            return newCategory;
        } catch (err) {
            setError('Failed to add category');
            console.error('Error adding category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update product
    const updateProduct = async (id, productData) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(productData),
            });
            const updatedProduct = await response.json();
            setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p));
            setError(null);
            return updatedProduct;
        } catch (err) {
            setError('Failed to update product');
            console.error('Error updating product:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update category
    const updateCategory = async (id, categoryData) => {
        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(categoryData),
            });
            const updatedCategory = await response.json();
            setCategories(prev => prev.map(c => c._id === id ? updatedCategory : c));
            setError(null);
            return updatedCategory;
        } catch (err) {
            setError('Failed to update category');
            console.error('Error updating category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete product
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            setProducts(prev => prev.filter(p => p._id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete product');
            console.error('Error deleting product:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete category
    const deleteCategory = async (id) => {
        try {
            setLoading(true);
            await fetch(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            setCategories(prev => prev.filter(c => c._id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete category');
            console.error('Error deleting category:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchUsers();
    }, []);

    const value = {
        products,
        categories,
        users,
        loading,
        error,
        addProduct,
        addCategory,
        updateProduct,
        updateCategory,
        deleteProduct,
        deleteCategory,
        fetchProducts,
        fetchCategories,
        fetchUsers,
    };

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}; 