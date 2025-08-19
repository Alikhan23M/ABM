import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTrash } from 'react-icons/fa';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    category: '',
    images: [],
  });

  const [categories, setCategories] = useState(null); // fetched categories
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await AxiosRequest.get('/api/categories');
        setCategories(data); // expects array of { _id, name }
      } catch (err) {
        toast.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  // Remove image
  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== index),
    }));
  };

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, category: e.target.value }); // store _id
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return;
    }

    try {
      const response = await AxiosRequest.post('/api/events/events', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Event created successfully!');
      console.log('Created Event:', response.data);

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        time: '',
        category: '',
        images: [],
      });
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Failed to create event');
    }
  };

  return (
    <div className="flex items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-md w-full"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white">
          <Typography variant="h4" className="mb-6 text-black">
            Create New Event
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                color="black"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <Input
                label="Description"
                type="text"
                color="black"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="mb-6">
              <Input
                label="Location"
                type="text"
                color="black"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Time */}
            <div className="mb-6">
              <Input
                label="Time"
                type="datetime-local"
                color="black"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category (custom select) */}
            <div className="mb-6 text-left">
              <label className="block mb-2 text-gray-700 font-medium">
                Event Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
                className="w-full border border-gray-300 rounded-lg p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select a category</option>
                {categories?.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories available</option>
                )}
              </select>
            </div>

            {/* Image Upload */}
            <div className="mb-6 border rounded-lg p-2 border-black text-left">
              <label className="block mb-1 text-gray-700 font-medium">
                Upload Images
              </label>
              <CloudinaryUpload
                onUploadSuccess={(urlOrUrls) => {
                  if (!urlOrUrls) return;
                  setFormData((prev) => {
                    if (Array.isArray(urlOrUrls)) {
                      const validUrls = urlOrUrls
                        .map((u) => (typeof u === 'object' ? u.secure_url : u))
                        .filter((u) => typeof u === 'string' && u.startsWith('http'));
                      return { ...prev, images: [...prev.images, ...validUrls] };
                    } else {
                      const singleUrl =
                        typeof urlOrUrls === 'object' ? urlOrUrls.secure_url : urlOrUrls;
                      if (typeof singleUrl === 'string' && singleUrl.startsWith('http')) {
                        return { ...prev, images: [...prev.images, singleUrl] };
                      }
                    }
                    return prev;
                  });
                }}
                folder="Events"
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                multiple={true}
              />
            </div>

            {/* Preview uploaded images */}
            {formData.images.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {formData.images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20">
                    <img
                      src={img}
                      alt={`Event ${idx}`}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={formData.images.length === 0 || !formData.category}
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Create Event
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateEvent;
