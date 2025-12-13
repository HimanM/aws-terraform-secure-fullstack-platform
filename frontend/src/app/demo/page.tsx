'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cloud, Plus, Trash2, Edit2, RefreshCw, X, Check, Loader2, Sparkles, Menu, Zap, Terminal } from 'lucide-react';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Cloud className="h-8 w-8 text-orange-500 animate-float" />
                <Sparkles className="h-3 w-3 text-amber-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                DevOps Project 9
              </span>
            </div>
            <div className="hidden md:flex space-x-2">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/architecture" className="nav-link">Architecture</Link>
              <Link href="/demo" className="nav-link active">Live Demo</Link>
              <Link href="/terraform" className="nav-link">Terraform</Link>
            </div>
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-orange-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 animate-slide-up">
              <div className="flex flex-col space-y-2">
                <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link href="/architecture" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Architecture</Link>
                <Link href="/demo" className="nav-link active" onClick={() => setMobileMenuOpen(false)}>Live Demo</Link>
                <Link href="/terraform" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Terraform</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="animate-slide-up">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-3">
              <Zap className="h-3 w-3 mr-1" />
              Live API
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">CRUD Demo</h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2 flex-wrap">
              <Terminal className="h-4 w-4" />
              <code className="glass px-3 py-1 rounded-lg text-sm font-mono">{API_URL}</code>
            </p>
          </div>
          <div className="flex space-x-3 animate-slide-up stagger-1">
            <button
              onClick={fetchItems}
              className="flex items-center space-x-2 glass hover:bg-gray-100 px-4 py-2 rounded-xl transition-all hover:-translate-y-1"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                setShowCreateForm(true);
                setEditingItem(null);
                setFormData({ name: '', description: '', category: '', price: 0 });
              }}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Item</span>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-xl mb-6 animate-slide-up flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-red-500">⚠️</span>
              <span><strong>Error:</strong> {error}</span>
            </div>
            <button onClick={() => setError(null)} className="hover:bg-red-100 rounded-lg p-1 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Create/Edit Form */}
        {(showCreateForm || editingItem) && (
          <div className="glass rounded-2xl p-6 mb-8 animate-bounce-in shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              {editingItem ? (
                <><Edit2 className="h-5 w-5 text-blue-500" /> Edit Item</>
              ) : (
                <><Plus className="h-5 w-5 text-emerald-500" /> Create New Item</>
              )}
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="e.g. Electronics"
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
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="Optional description"
                  />
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="submit"
                  className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white px-5 py-2 rounded-xl transition-all hover:-translate-y-1 shadow-lg"
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
                  className="flex items-center space-x-2 glass hover:bg-gray-100 text-gray-700 px-5 py-2 rounded-xl transition-all"
                >
                  <X className="h-4 w-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Items List */}
        <div className="glass rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                        <p className="mt-3 text-gray-500">Loading items...</p>
                      </div>
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                          <Plus className="h-8 w-8 text-orange-500" />
                        </div>
                        <p className="text-gray-500 mb-2">No items found</p>
                        <p className="text-sm text-gray-400">Click &quot;Add Item&quot; to create one!</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-orange-50/50 transition-colors" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-400 font-mono">{item.id.slice(0, 8)}...</div>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-500 max-w-xs truncate hidden sm:table-cell">{item.description || '-'}</td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full">
                          {item.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => startEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
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
        </div>

        {/* API Info */}
        <div className="mt-8 glass rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
            <Terminal className="h-5 w-5 text-orange-500" />
            API Endpoints
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-sm">
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">GET</span> /items</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">GET</span> /items/&#123;id&#125;</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-bold">POST</span> /items</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">PUT</span> /items/&#123;id&#125;</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-bold">DELETE</span> /items/&#123;id&#125;</div>
            <div className="flex items-center gap-2 text-gray-700"><span className="px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs font-bold">GET</span> /health</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Cloud className="h-6 w-6 text-orange-500" />
              <span className="font-semibold text-gray-700">DevOps Project 9</span>
            </div>
            <p className="text-gray-500 text-sm text-center md:text-right">
              Built with Next.js, FastAPI, Terraform & AWS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
