import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const navigation = [
        { name: 'Dashboard', path: '/', icon: '📊' },
        { name: 'Products', path: '/products', icon: '🍅' },
        { name: 'Categories', path: '/categories', icon: '📁' },
        { name: 'Orders', path: '/orders', icon: '🛒' },
        { name: 'Users', path: '/users', icon: '👥' },
        { name: 'Settings', path: '/settings', icon: '⚙️' },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b border-gray-200">
                <h1 className="text-xl font-bold text-orange-500">Tomato Admin</h1>
            </div>

            {/* Navigation */}
            <nav className="mt-6">
                {navigation.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-6 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors ${
                                isActive ? 'bg-orange-50 text-orange-600 border-r-4 border-orange-500' : ''
                            }`
                        }
                    >
                        <span className="mr-3">{item.icon}</span>
                        {item.name}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar; 