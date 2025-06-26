import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

const AdminLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
                <Header />
                <div className="flex-1 py-20 px-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout; 