import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const CategoryCard = ({ category }) => {
    const { selectedCategory, filterByCategory, resetFilters } = useContext(StoreContext);

    const handleClick = () => {
        if (category) {
            filterByCategory(category._id);
        } else {
            resetFilters();
        }
    };

    const isSelected = category ? selectedCategory === category._id : !selectedCategory;

    if (!category) {
        return (
            <div
                onClick={handleClick}
                className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform ${isSelected ? 'ring-2 ring-orange-500' : ''}`}
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">All Products</h3>
                    <p className="text-gray-600">View all available products</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`bg-white rounded-lg shadow-md overflow-hidden ${isSelected ? 'ring-2 ring-orange-500' : ''}`}
        >
            <div 
                className="cursor-pointer"
                onClick={handleClick}
            >
                <div className="aspect-w-16 aspect-h-9">
                    <img
                        src={category.menu_image}
                        alt={category.menu_name}
                        className="w-full h-48 object-cover"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{category.menu_name}</h3>
                </div>
            </div>
            <div className="px-4 pb-4 flex justify-end space-x-2">
                <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 text-indigo-600 hover:text-indigo-900"
                >
                    Edit
                </button>
                <button
                    onClick={() => handleDelete(category._id)}
                    className="px-3 py-1 text-red-600 hover:text-red-900"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CategoryCard; 