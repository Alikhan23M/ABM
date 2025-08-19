import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Spinner, Dialog, Input } from '@material-tailwind/react'; // Adjust imports as per your UI library
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const AllCareer = () => {
  const [careers, setCareers] = useState([]);
  const [editingCareer, setEditingCareer] = useState(null);
  const [viewingCareer, setViewingCareer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await AxiosRequest.get('/api/career/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCareers(response.data);
      } catch (error) {
        toast.error(error.response ? error.response.data.message : 'Failed to fetch careers');
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, [token]);

  const handleEditClick = (career) => {
    setEditingCareer(career);
    setIsDialogOpen(true);
  };

  const handleViewClick = (career) => {
    setViewingCareer(career);
    setIsViewingDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/career/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCareers(careers.filter(career => career._id !== id));
      toast.success('Career deleted successfully');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Failed to delete career');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingCareer(null);
  };

  const handleViewingDialogClose = () => {
    setIsViewingDialogOpen(false);
    setViewingCareer(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description } = editingCareer;
      const response = await AxiosRequest.put(`/api/career/${_id}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCareers(careers.map(career => (career._id === _id ? response.data : career)));
      handleDialogClose();
      toast.success('Career updated successfully');
    } catch (error) {
      toast.error(error.response ? error.response.data.message : 'Failed to update career');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingCareer({ ...editingCareer, [name]: value });
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
      <Typography variant="h3" className="text-white mb-8">All Careers</Typography>

      {careers.length === 0 ? (
        <Typography variant="body1" className="text-white">No careers found.</Typography>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 max-w-4xl w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {careers.map((career) => (
              <motion.div
                key={career._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 flex flex-col items-center text-center bg-white shadow-lg rounded-lg">
                  <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">{career.title}</Typography>
                  <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                    {career.description.length > 20 ? `${career.description.slice(0, 20)}...` : career.description}
                  {career.description.length > 20 && (
                    <span
                    className="cursor-pointer text-blue-500"
                    onClick={() => handleViewClick(career)}
                  >
                    Read More
                  </span>
                  )}
                   </Typography>
                  <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Posted on: {new Date(career.createdAt).toLocaleDateString()}</Typography>
                  <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Location: {career.location}</Typography>
                  <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Internship: {career.isInternship ? 'Yes' : 'No'}</Typography>
                  <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Apply Link: <a href={career.applyLink} target="_blank" rel="noopener noreferrer">{career.applyLink}</a></Typography>
                  <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(career)}>
                    Edit
                  </Button>
                  <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(career._id)}>
                    Delete
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Dialog for Editing Career */}
      {editingCareer && (
        <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
            <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
              <FaTimes className="text-black text-xl" />
            </div>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Edit Career
            </h4>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-6">
                <Input
                  label="Title"
                  type="text"
                  color="black"
                  className="focus:!ring-0"
                  name="title"
                  value={editingCareer.title}
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
                  value={editingCareer.description}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                Update Career
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* Dialog for Viewing Career */}
      {viewingCareer && (
        <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isViewingDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] gap-[2vh] flex-col rounded-xl bg-white bg-clip-border text-gray-700 overflow-y-auto shadow-md p-6">
            <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleViewingDialogClose}>
              <FaTimes className="text-black text-xl" />
            </div>
            <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-4">
              {viewingCareer.title}
            </h4>
            <p className="block font-sans text-base font-light leading-relaxed antialiased text-inherit">
              {viewingCareer.description}
            </p>
            <p className="block font-sans text-base font-light leading-relaxed antialiased text-inherit">Posted on: {new Date(viewingCareer.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCareer;

