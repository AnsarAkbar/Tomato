import React, { useState } from 'react';
import CategoryModal from './CategoryModal';

const CategoryHeader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Manage Categories</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center"
                >
                    <span className="mr-2">➕</span> Add Category
                </button>
            </div>

            {isModalOpen && <CategoryModal onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

export default CategoryHeader; 