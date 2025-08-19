import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';

const AllPictures = () => {
  const [pictures, setPictures] = useState([]);
  const [editingPicture, setEditingPicture] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        const response = await AxiosRequest.get('/api/pictures/pictures', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPictures(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchPictures();
  }, [token]);

  const handleEditClick = (picture) => {
    setEditingPicture(picture);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/pictures/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPictures(pictures.filter(picture => picture._id !== id));
      toast.success('Picture deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingPicture(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, imageUrl } = editingPicture;
      const response = await AxiosRequest.put(`/api/pictures/${_id}`, { title, imageUrl }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPictures(pictures.map(picture => (picture._id === _id ? response.data : picture)));
      handleDialogClose();
      toast.success('Picture updated successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPicture({ ...editingPicture, [name]: value });
  };

  const handleImageUploadSuccess = (url) => {
    setEditingPicture({ ...editingPicture, imageUrl: url });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-4xl w-full"
      >
        <Typography variant="h2" className="mb-6 text-white">All Pictures</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pictures.map((picture) => (
            <motion.div
              key={picture._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">{picture.title}</Typography>
                <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">{picture.description}</Typography>
                {picture.imageUrl && (
                  <img src={picture.imageUrl} alt={picture.title} className="mb-4 w-36 self-center h-32 object-cover rounded-lg" />
                )}
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(picture)}>
                  Edit
                </Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(picture._id)}>
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingPicture && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Picture
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                  <Input
                    label="Title"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="title"
                    value={editingPicture.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                {editingPicture.imageUrl && (
                  <img src={editingPicture.imageUrl} alt={editingPicture.title} className="mb-4 w-full rounded-lg" />
                )}
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Pictures" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                  Update Picture
                </Button>
              </form>
              <Button className="mt-4 bg-red-500 w-full shadow-none hover:shadow-md hover:shadow-gray-800" onClick={handleDialogClose}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllPictures;
