import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest'; // Adjust path as per your project structure
import CloudinaryUpload from '../../../../Utilities/Cloudinary'; // Adjust path as per your project structure
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const AddPicture = () => {
  const [formData, setFormData] = useState({
    title: '',
    imageUrl: '',
  });
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploaded,setUploaded] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUploadSuccess = (url) => {
    setFormData({ ...formData, imageUrl: url });
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/pictures/addPictures', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Picture added successfully!');
      console.log('Added Picture:', response.data); // Optionally handle the response data

      // Reset form data after successful submission
      setFormData({
        title: '',
        imageUrl: '',
      });
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Failed to add picture');
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
            Add New Picture
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <Input
                label="Title"
                type="text"
                color="black"
                className="focus:!ring-0"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Pictures" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
            </div>
             {formData.imageUrl && (
                          <div className="relative inline-block">
                            <img
                              src={formData.imageUrl}
                              alt="Uploaded Preview"
                              className="w-20 h-20 object-cover rounded border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, imageUrl: '' });
                                setUploaded(false);
                              }}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        )}
            <Button
              type="submit"
              disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Add Picture
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddPicture;
