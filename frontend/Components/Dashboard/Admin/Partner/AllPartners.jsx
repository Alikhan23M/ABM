import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa'; // Import Close icon from Font Awesome

const AllPartners = () => {
  const [partners, setPartners] = useState([]);
  const [editingPartner, setEditingPartner] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [viewingPartner, setViewingPartner] = useState(null);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await AxiosRequest.get('/api/partners/getTeam', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPartners(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchPartners();
  }, [token]);

  const handleEditClick = (partner) => {
    setEditingPartner(partner);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/partners/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPartners(partners.filter(partner => partner._id !== id));
      toast.success('Partner deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingPartner(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, name, imageUrl, description } = editingPartner;
      const response = await AxiosRequest.put(`/api/partners/${_id}`, { name, imageUrl, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPartners(partners.map(partner => (partner._id === _id ? response.data : partner)));
      handleDialogClose();
      toast.success('Partner updated successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPartner({ ...editingPartner, [name]: value });
  };

  const handleViewClick = (partner) => {
    setViewingPartner(partner); // Ensure `partner` object contains `title` and `content`
    setIsViewingDialogOpen(true);
  };

  const handleViewingDialogClose = () => {
    setIsViewingDialogOpen(false);
    setViewingPartner(null);
  };

  const handleImageUploadSuccess = (url) => {
    setEditingPartner({ ...editingPartner, imageUrl: url });
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
        <Typography variant="h2" className="mb-6 text-white">All Partners</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <motion.div
              key={partner._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-sm md:text-md lg:text-lg">{partner.name}</Typography>
                <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                  {partner.description.length > 20 ? `${partner.description.slice(0, 20)}...` : partner.description}
                  {partner.description.length > 20 && (
                    <span className="cursor-pointer text-blue-500" onClick={() => handleViewClick(partner)}>
                      Read More
                    </span>
                  )}
                </Typography>
                {partner.imageUrl && (
                  <img src={partner.imageUrl} alt={partner.name} className="mb-4 w-36 self-center h-32 object-cover rounded-lg" />
                )}
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(partner)}>
                  Edit
                </Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(partner._id)}>
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingPartner && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Partner
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                  <Input
                    label="Name"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="name"
                    value={editingPartner.name}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Input
                    label="Description"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="description"
                    value={editingPartner.description}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Partners" />
                  </div>
                  {editingPartner.imageUrl && (
                    <div className="mt-3 relative inline-block">
                      <img
                        src={editingPartner.imageUrl}
                        alt="Uploaded Preview"
                        className="w-20 h-20 object-cover rounded border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setEditingPartner({ ...editingPartner, imageUrl: '' });
                        }}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                      >
                        <FaTimes size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                  Update Partner
                </Button>
              </form>
            </div>
          </div>
        )}

        {viewingPartner && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isViewingDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 overflow-y-auto shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleViewingDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-4">
                {viewingPartner.name}
              </h4>
              <p className="mb-4 text-black text-sm sm:text-base md:text-lg">{viewingPartner.description}</p>

            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllPartners;
