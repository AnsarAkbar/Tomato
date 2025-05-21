import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
export default function Columns(categories, currentPage, rowsPerPage, handleEdit, handleDelete) {
    const columns = [
        {
            name: 'Serial No',
            cell: (row, index) => ((currentPage - 1) * rowsPerPage) + index + 1,
            width: '140px',
            center: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex space-x-2">
                    <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(row)}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(row.id)}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '150px',
        }
    ];
    return columns;
}

