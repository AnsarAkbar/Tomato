import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import CategoryCard from './CategoryCard';
import ProductCard from '../products/ProductCard';

const CategoryList = () => {
    const { 
        categories, 
        filteredProducts, 
        selectedCategory,
        loading,
        error 
    } = useContext(StoreContext);

    if (loading) return <div className="text-center py-8">Loading...</div>;
    if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

    return (
        <>
            {/* Categories Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard key={category._id} category={category} />
                    ))}
                </div>
            </div>

            {/* Filtered Products Section */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                    {selectedCategory 
                        ? `Products in ${categories.find(c => c._id === selectedCategory)?.menu_name || 'Selected Category'}`
                        : 'All Products'
                    }
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default CategoryList; 