import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Button, Typography, Spinner, Input } from '@material-tailwind/react';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import '@fontsource/poppins';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa';


const AllSliderImages = () => {
  const [sliderImages, setSliderImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const response = await AxiosRequest.get('/api/slider-images/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSliderImages(response.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.response ? error.response.data.message : 'Error fetching slider images');
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, [token]);

  const handleEditClick = (image) => {
    setEditingImage(image);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/slider-images/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSliderImages(sliderImages.filter((image) => image._id !== id));
      toast.success('Slider image deleted successfully');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Error deleting slider image');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingImage(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, imageUrl } = editingImage;
      // Assuming your backend supports updating slider images similarly
      const response = await AxiosRequest.put(`/api/slider-images/${_id}`, { title, imageUrl }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSliderImages(sliderImages.map((image) => (image._id === _id ? response.data : image)));
      handleDialogClose();
      toast.success('Slider image updated successfully');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Error updating slider image');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingImage({ ...editingImage, [name]: value });
  };

  const handleImageUploadSuccess = (url) => {
    setEditingImage({ ...editingImage, imageUrl: url });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r text-center justify-center items-center from-blue-500 to-indigo-600 py-10 font-poppins">
      <Toaster />
      <Typography variant="h2" className="mb-6 text-white">
          All Slider Images
        </Typography>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-4xl w-full"
      >

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliderImages.map((image) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <img src={image.imageUrl} alt={image.title} className="mb-4 w-full h-48 object-cover rounded-lg" />
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">
                  {image.title}
                </Typography>
                <Button
                  className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
                  onClick={() => handleEditClick(image)}
                >
                  Edit
                </Button>
                <Button
                  className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800"
                  onClick={() => handleDeleteClick(image._id)}
                >
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingImage && (
          <div
            className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${
              isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
            <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
              <FaTimes className="text-black text-xl" />
            </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Slider Image
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                <Input
                    label="Title"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="title"
                    value={editingImage.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {editingImage.imageUrl && (
                  <img src={editingImage.imageUrl} alt={editingImage.title} className="mb-4 w-full rounded-lg" />
                )}
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="SliderImages" />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
                >
                  Update Slider Image
                </Button>
              </form>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllSliderImages;
