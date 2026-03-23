import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const API_URL = 'http://localhost:8080/api/products';

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle adding a new product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    const dataToSend = {
      name: newProduct.name,
      price: parseFloat(newProduct.price)
    };

    try {
      await axios.post(API_URL, dataToSend);
      fetchProducts(); // Refresh list
      setNewProduct({ name: '', price: '' }); // Clear form
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please check backend connection.");
    }
  };

  // Handle deleting a product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts(); // Refresh list
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
      }
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '900px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333' }}>Inventory Management System</h1>
        <p style={{ color: '#666' }}>Manage your store products efficiently</p>
      </header>
      
      {/* Product Form Section */}
      <section style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '30px' }}>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Product Name" 
            value={newProduct.name} 
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
            required 
            style={{ padding: '10px', flex: '2', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <input 
            type="number" 
            placeholder="Price" 
            value={newProduct.price} 
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            required 
            style={{ padding: '10px', flex: '1', borderRadius: '4px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Add Product
          </button>
        </form>
      </section>

      {/* Product Table Section */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Price (INR)</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{product.id}</td>
                  <td style={{ padding: '12px' }}>{product.name}</td>
                  <td style={{ padding: '12px' }}>₹{product.price}</td>
                  <td style={{ padding: '12px' }}>
                    <button 
                      onClick={() => handleDelete(product.id)}
                      style={{ padding: '6px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#999' }}>No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;