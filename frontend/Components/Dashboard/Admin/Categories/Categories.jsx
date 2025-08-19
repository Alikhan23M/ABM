import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); // New state for description
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const fetchCategories = async () => {
    try {
      const response = await AxiosRequest.get('/api/categories');
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post(
        '/api/categories',
        { title, description }, // send description too
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories([...categories, response.data]);
      toast.success('Category added successfully');
      setTitle('');
      setDescription('');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setTitle(category.title);
    setDescription(category.description || '');
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.put(
        `/api/categories/${editingCategory._id}`,
        { title, description }, // send description on update
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCategories(
        categories.map((cat) => (cat._id === editingCategory._id ? response.data : cat))
      );
      toast.success('Category updated successfully');
      setEditingCategory(null);
      setTitle('');
      setDescription('');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosRequest.delete(`/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success('Category deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-white" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-2xl w-full"
      >
        <Typography variant="h4" className="mb-6 text-white text-center">
          Manage Categories
        </Typography>

        {/* Add/Edit Category Form */}
        <form onSubmit={editingCategory ? handleEditSubmit : handleAddCategory} className="mb-6">
          <div className="mb-4">
            <Input
              label="Category Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              type='text'
              color="black"
              className="focus:!ring-0 text-white"
            />
          </div>
          <div className="mb-4">
            <Input
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              type='text'
              color="black"
              className="focus:!ring-0 text-white"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </Button>
          {editingCategory && (
            <Button
              type="button"
              className="mt-2 w-full bg-red-500"
              onClick={() => {
                setEditingCategory(null);
                setTitle('');
                setDescription('');
              }}
            >
              Cancel
            </Button>
          )}
        </form>

        {/* Category List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card key={cat._id} className="p-4 flex flex-col justify-between bg-white shadow-lg">
              <Typography variant="h6" className="text-black">
                {cat.title}
              </Typography>
              <Typography variant="small" className="text-gray-600 mb-2">
                {cat.description}
              </Typography>
              <div className="flex gap-2 mt-auto">
                <Button size="sm" color="blue" onClick={() => handleEditClick(cat)}>
                  Edit
                </Button>
                <Button size="sm" color="red" onClick={() => handleDelete(cat._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Categories;
