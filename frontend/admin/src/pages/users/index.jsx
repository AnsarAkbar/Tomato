import React, { useContext, useState } from 'react';
import { CustomMaterialPagination } from '../../utils/TablePaginationActions';
import DataTable from 'react-data-table-component'

import { StoreContext } from '../../context/StoreContext';
import Columns from './column';

const Users = () => {
    const { users } = useContext(StoreContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleEdit = (row) => {
        console.log('Edit user:', row);
        // Implement edit functionality here
    }
    const handleDelete = (id) => {
        console.log('Delete user with id:', id);
        // Implement delete functionality here
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Users</h1>
            {
                users.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500">No users found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <DataTable
                            title="Users List"
                            columns={Columns(users, currentPage, rowsPerPage, handleEdit, handleDelete)}
                            data={users}
                            pagination={true}
                            // paginationPerPage={10} // Default rows per page
                            // paginationRowsPerPageOptions={[5, 10, 15, 20]}
                            onChangePage={(page) => setCurrentPage(page)}
                            onChangeRowsPerPage={(perPage, page) => {
                                setRowsPerPage(perPage);
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                )
            }

        </div>
    );
};

export default Users; 