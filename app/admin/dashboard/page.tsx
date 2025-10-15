'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_path?: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const router = useRouter();

  // Prepare chart data
  const stockChartData = products.map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    stock: product.quantity,
    price: product.price
  }));

  const totalStock = products.reduce((sum, product) => sum + product.quantity, 0);
  const lowStockProducts = products.filter(product => product.quantity < 10);
  const outOfStockProducts = products.filter(product => product.quantity === 0);

  const pieChartData = [
    { name: 'In Stock', value: totalStock - outOfStockProducts.reduce((sum, p) => sum + p.quantity, 0), color: '#10B981' },
    { name: 'Low Stock (< 10)', value: lowStockProducts.reduce((sum, p) => sum + p.quantity, 0), color: '#F59E0B' },
    { name: 'Out of Stock', value: outOfStockProducts.length, color: '#EF4444' }
  ];

  useEffect(() => {
    checkAuth();
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('quantity', formData.quantity);

    if (selectedImage) {
      formDataToSend.append('image', selectedImage);
    }

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        setFormData({ name: '', description: '', price: '', quantity: '' });
        setSelectedImage(null);
        setImagePreview('');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      quantity: product.quantity.toString()
    });
    setImagePreview(product.image_path || '');
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
        <div className="flex space-x-4">
          <Button onClick={() => setShowForm(true)} className="bg-black text-white hover:bg-gray-800">
            Add Product
          </Button>
          <Button onClick={handleLogout} variant="outline" className="border-gray-300">
            Logout
          </Button>
        </div>
      </header>

      <div className="p-6">
        {/* Stock Analytics */}
        <div className="grid gap-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-black">Total Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">{totalStock}</p>
                <p className="text-sm text-gray-600">Across all products</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-black">Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">{lowStockProducts.length}</p>
                <p className="text-sm text-gray-600">{"Products with < 10 stock"}</p>
              </CardContent>
            </Card>
            <Card className="bg-white border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-black">Out of Stock</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">{outOfStockProducts.length}</p>
                <p className="text-sm text-gray-600">Products with 0 stock</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Stock Levels by Product</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stockChartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-black">Stock Status Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Form */}
        {showForm && (
          <Card className="mb-8 bg-white border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                    rows={3}
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setSelectedImage(file);
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setImagePreview(e.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-black"
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 object-cover border border-gray-300"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                      setFormData({ name: '', description: '', price: '', quantity: '' });
                      setSelectedImage(null);
                      setImagePreview('');
                    }}
                    variant="outline"
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Products List */}
        <div className="grid gap-6">
          <h2 className="text-xl font-bold text-black">Products ({products.length})</h2>
          {products.length === 0 ? (
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-8 text-center">
                <p className="text-gray-600">No products found. Add your first product!</p>
              </CardContent>
            </Card>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-200">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-black">{product.name}</h3>
                      <p className="text-gray-600 mt-1">{product.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-red-300 font-bold">₱{product.price}</span>
                        <span className="text-gray-600">Quantity: {product.quantity}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleEdit(product)}
                        variant="outline"
                        size="sm"
                        className="border-gray-300"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(product.id)}
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}