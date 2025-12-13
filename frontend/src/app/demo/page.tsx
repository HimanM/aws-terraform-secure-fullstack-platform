'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cloud, Plus, Trash2, Edit2, RefreshCw, X, Check, Loader2 } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  created_at: string;
  updated_at: string;
}

interface ItemCreate {
  name: string;
  description: string;
  category: string;
  price: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function DemoPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<ItemCreate>({
    name: '',
    description: '',
    category: '',
    price: 0,
  });

  // Fetch items
  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok) throw new Error('Failed to fetch items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
    } finally {
      setLoading(false);
    }
  };

  // Create item
  const createItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create item');
      await fetchItems();
      setShowCreateForm(false);
      setFormData({ name: '', description: '', category: '', price: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
    }
  };

  // Update item
  const updateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    try {
      const response = await fetch(`${API_URL}/items/${editingItem.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update item');
      await fetchItems();
      setEditingItem(null);
      setFormData({ name: '', description: '', category: '', price: 0 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
    }
  };

  // Delete item
  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete item');
      await fetchItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  // Start editing
  const startEdit = (item: Item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
    });
    setShowCreateForm(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-aws-dark text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-aws-orange" />
              <span className="text-xl font-bold">DevOps Project 9</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/architecture" className="nav-link">Architecture</Link>
              <Link href="/demo" className="nav-link active">Live Demo</Link>
              <Link href="/terraform" className="nav-link">Terraform</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Live CRUD Demo</h1>
            <p className="text-gray-600 mt-2">
              API Endpoint: <code className="bg-gray-200 px-2 py-1 rounded text-sm">{API_URL}</code>
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchItems}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingItem(null);
                setFormData({ name: '', description: '', category: '', price: 0 });
              }}
              className="flex items-center space-x-2 bg-aws-orange hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
            <button onClick={() => setError(null)} className="float-right">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Create/Edit Form */}
        {(showCreateForm || editingItem) && (
          <div className="bg-white rounded-xl p-6 shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem ? 'Edit Item' : 'Create New Item'}
            </h2>
            <form onSubmit={editingItem ? updateItem : createItem}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-aws-orange focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Check className="h-4 w-4" />
                  <span>{editingItem ? 'Update' : 'Create'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateForm(false);
                    setEditingItem(null);
                  }}
                  className="flex items-center space-x-2 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-aws-orange" />
                    <p className="mt-2 text-gray-500">Loading items...</p>
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No items found. Click &quot;Add Item&quot; to create one!
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.id.slice(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">{item.description || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(item)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* API Info */}
        <div className="mt-8 bg-gray-800 text-gray-100 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
          <div className="space-y-2 font-mono text-sm">
            <div><span className="text-green-400">GET</span> /items - List all items</div>
            <div><span className="text-green-400">GET</span> /items/&#123;id&#125; - Get item by ID</div>
            <div><span className="text-yellow-400">POST</span> /items - Create new item</div>
            <div><span className="text-blue-400">PUT</span> /items/&#123;id&#125; - Update item</div>
            <div><span className="text-red-400">DELETE</span> /items/&#123;id&#125; - Delete item</div>
            <div><span className="text-gray-400">GET</span> /health - Health check</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-aws-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            DevOps Project 9 - AWS Architecture Learning Project
          </p>
        </div>
      </footer>
    </div>
  );
}
