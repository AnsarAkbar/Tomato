import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@mui/icons-material';
const Columns = (
	categories,
	currentPage,
	rowsPerPage,
	handleEdit,
	handleDelete
) => {
	const columns = [
		{
			name: 'Serial No',
			cell: (row, index) => ((currentPage - 1) * rowsPerPage) + index + 1,
			// width: '100px',
			center: true,
			width: '140px',
		},
		{
			name: 'Name',
			selector: row => row.name,
			sortable: true,
			cell: row => (
				<div className="flex items-center">
					<img
						src={row.image}
						alt={row.name}
						className="w-10 h-10 rounded-full mr-2"
					/>
					<span>{row.name}</span>
				</div>
			),
		},
		{
			name: 'Description',
			selector: row => row.description,
			sortable: true,
			cell: row => (
				<div className="text-sm text-gray-500">
					{row.description ? row.description : 'No description available'}
				</div>
			),
		},
		{
			name: 'Actions',
			selector: row => row._id,
			cell: row => (
				<div className="flex space-x-2">
					<button
						onClick={() => handleEdit(row)}
						className="text-blue-500 hover:text-blue-700"
					>
						<EditIcon />
					</button>
					<button
						onClick={() => handleDelete(row._id)}
						className="text-red-500 hover:text-red-700"
					>
						<DeleteIcon />
					</button>
				</div>
			),
			width: '150px',
		},
	];
	return columns;
}
export default Columns;