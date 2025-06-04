import { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  MenuItem,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  InputAdornment,
  TablePagination
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import DataTable from 'react-data-table-component';
import Columns from './Columns';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    inStock: true
  });

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        // Fetch products
        const productsResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/products`, {
          headers
        });
        if (!productsResponse.ok) throw new Error('Failed to fetch products');
        const productsData = await productsResponse.json();
        setProducts(productsData);

        // Fetch categories
        const categoriesResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories`, {
          headers
        });

        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        // console.log(categoriesData);
      } catch (err) {
        setError(err.message);
        showSnackbar(err.message, 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const queryParams = {
  //   page: 1,
  //   limit: 10,
  //   search: "example"
  // };
  // const queryString = new URLSearchParams(queryParams).toString();

  // useMemo(
  //   () => {
  //     const fetchData = async () => {
  //       const productsResponse = await fetch(`${import.meta.env.VITE_API_URL}/admin/products${queryString}`, {
  //         headers
  //       });
  //       if (!productsResponse.ok) throw new Error('Failed to fetch products');
  //       const productsData = await productsResponse.json();
  //       setProducts(productsData);
  //       // console.log(filteredProductsData);
  //     }
  //     fetchData();
  //   }, [filteredProducts])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const url = selectedProduct
        ? `${import.meta.env.VITE_API_URL}/admin/products/${selectedProduct._id}`
        : `${import.meta.env.VITE_API_URL}/admin/products`;

      const method = selectedProduct ? 'PUT' : 'POST';

      // Create a copy of formData and ensure category is properly set
      const productData = {
        ...formData,
        category: formData.category // This should be the category ID
      };

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Failed to save product');

      const savedProduct = await response.json();

      // Find the category object for the saved product
      const categoryObj = categories.find(cat => cat._id === formData.category);

      // Update the products list with the proper category object
      setProducts(prev =>
        selectedProduct
          ? prev.map(p => p._id === savedProduct._id ? { ...savedProduct, category: categoryObj } : p)
          : [...prev, { ...savedProduct, category: categoryObj }]
      );

      handleCloseDialog();
      showSnackbar(`Product ${selectedProduct ? 'updated' : 'created'} successfully`, 'success');

    } catch (err) {
      showSnackbar(err.message, 'error');
    }
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete product');

      setProducts(prev => prev.filter(p => p._id !== productId));
      showSnackbar('Product deleted successfully', 'success');

    } catch (err) {
      showSnackbar(err.message, 'error');
    }
  };

  // Handle dialog open/close
  const handleOpenDialog = (product = null) => {
    console.log('product--->', product);
    if (product) {
      setSelectedProduct(product);
      setFormData({
        name: product?.name,
        description: product?.description,
        price: product?.price,
        category: product?.category?._id,
        image: product?.image,
        inStock: product?.inStock
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        inStock: true
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      inStock: true
    });
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Handle file upload and convert to Base64
    // if (type === 'file') {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file); // Convert to Base64
    //   reader.onload = () => {
    //     setFormData(prev => ({
    //       ...prev,
    //       [name]: reader.result
    //     }));
    //   };
    //   return;
    // }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle snackbar
  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };
  // console.log('product-->',products)
  // Filter and search products
  const filteredProducts = products
    .filter(product =>
      product?.name.toLowerCase().includes(searchTerm.toLowerCase())
      // ||
      // product?.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      categoryFilter === 'all' || product?.category?._id === categoryFilter
    );
  console.log('filteredProducts--->', filteredProducts);
  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" component="h1">
              Products Management
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add Product
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            select
            fullWidth
            variant="outlined"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Filter by Category"
          >
            <MenuItem value="all">All Categories</MenuItem>
            {categories.map(category => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Stock Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProducts && filteredProducts
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(product => (
                    <TableRow key={product._id}>
                      <TableCell>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: 50, height: 50, objectFit: 'cover' }}
                        />
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        {product.category ? product.category.name : 'No Category'}
                      </TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(product)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(product._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        No products found
                      </TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredProducts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid> */}
      </Grid>


      {/* <div className="overflow-x-auto"> */}
      <DataTable
        title="Products List"
        columns={Columns(currentPage, rowsPerPage, handleOpenDialog, handleDelete)}
        data={filteredProducts}
        pagination={true}
        // paginationPerPage={10} // Default rows per page
        // paginationRowsPerPageOptions={[5, 10, 15, 20]}
        onChangePage={(page) => setCurrentPage(page)}
        onChangeRowsPerPage={(perPage, page) => {
          setRowsPerPage(perPage);
          setCurrentPage(page);
        }}
      />
      {/* </div> */}


      {/* Add/Edit Product Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedProduct ? 'Edit Product' : 'Add New Product'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  required
                  error={!formData.category}
                  helperText={!formData.category ? 'Category is required' : ''}
                >
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!formData.category}
            >
              {selectedProduct ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Products; 