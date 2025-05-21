import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </div>
            <div className="p-4">
                <h4 className="text-lg font-semibold mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-2">${product.price}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex justify-end space-x-2">
                    <button
                        onClick={() => {}} // Add edit handler
                        className="px-3 py-1 text-indigo-600 hover:text-indigo-900"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {}} // Add delete handler
                        className="px-3 py-1 text-red-600 hover:text-red-900"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard; 