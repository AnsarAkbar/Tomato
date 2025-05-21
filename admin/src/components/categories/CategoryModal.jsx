import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/AuthContext';

const CategoryModal = ({ category, onClose }) => {
    const { setCategories } = useContext(StoreContext);
    const [formData, setFormData] = useState({
        menu_name: category?.menu_name || '',
        menu_image: category?.menu_image || ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = category
                ? `${process.env.REACT_APP_API_URL}/categories/${category._id}`
                : `${process.env.REACT_APP_API_URL}/categories`;
            
            const response = await fetch(url, {
                method: category ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to save category');

            const result = await response.json();
            
            setCategories(prev => {
                if (category) {
                    return prev.map(cat => cat._id === category._id ? result : cat);
                }
                return [...prev, result];
            });

            onClose();
        } catch (error) {
            console.error('Error saving category:', error);
            // You might want to show an error message to the user here
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">
                    {category ? 'Edit Category' : 'Add New Category'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={formData.menu_name}
                            onChange={(e) => setFormData(prev => ({ ...prev, menu_name: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL
                        </label>
                        <input
                            type="text"
                            value={formData.menu_image}
                            onChange={(e) => setFormData(prev => ({ ...prev, menu_image: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border rounded-md hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                        >
                            {category ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal; 