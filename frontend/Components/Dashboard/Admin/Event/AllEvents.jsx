import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaCross, FaTimes, FaTrash } from 'react-icons/fa';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  const [viewingEvent, setViewingEvent] = useState(null);

  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await AxiosRequest.get('/api/events/events', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEvents(response.data);
      } catch (err) {
        toast.error(err.response?.data.message || 'Server error');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [token]);

  const handleEditClick = (event) => {
    setEditingEvent(event);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/events/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(events.filter((event) => event._id !== id));
      toast.success('Event deleted successfully');
    } catch (err) {
      toast.error(err.response?.data.message || 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingEvent(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent({ ...editingEvent, [name]: value });
  };

  const handleImageUploadSuccess = (urls) => {
    // If multiple images uploaded, urls will be array; if single, string
    if (Array.isArray(urls)) setEditingEvent({ ...editingEvent, images: [...editingEvent.images, ...urls] });
    else setEditingEvent({ ...editingEvent, images: [urls] });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, location, time, images, category } = editingEvent;
      const response = await AxiosRequest.put(`/api/events/events/${_id}`, {
        title, description, location, time, images, category
      }, { headers: { Authorization: `Bearer ${token}` } });
      setEvents(events.map((event) => (event._id === _id ? response.data : event)));
      handleDialogClose();
      toast.success('Event updated successfully');
    } catch (err) {
      toast.error(err.response?.data.message || 'Server error');
    }
  };

  const handleViewClick = (event) => {
    setViewingEvent(event);
    setIsViewingDialogOpen(true);
  };
  const handleViewingDialogClose = () => {
    setIsViewingDialogOpen(false);
    setViewingEvent(null);
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
        <Typography variant="h2" className="mb-6 text-white">All Events</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div key={event._id} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-sm md:text-md lg:text-lg">{event.title}</Typography>
                <Typography className="mb-4 text-black text-sm sm:text-base md:text-lg">Location: {event.location}</Typography>
                <Typography className="mb-4 text-black text-sm sm:text-base md:text-lg">Time: {new Date(event.time).toLocaleString()}</Typography>
                <Typography className="mb-4 text-black text-sm sm:text-base md:text-lg">
                  <span className="cursor-pointer text-blue-500" onClick={() => handleViewClick(event)}>See Details</span>
                </Typography>
                {event.images?.length > 0 && (
                  <img src={event.images[0]} alt={event.title} className="mb-4 w-36 self-center h-32 object-cover rounded-lg" />
                )}
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(event)}>Edit</Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(event._id)}>Delete</Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Edit Dialog */}
        {editingEvent && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900">Edit Event</h4>
              <form onSubmit={handleEditSubmit} className='space-y-4'>
                <Input label="Title" name="title" value={editingEvent.title} onChange={handleEditChange} required className="mb-4 focus:!ring-0" />
                <Input label="Description" name="description" value={editingEvent.description} onChange={handleEditChange} required className="mb-4 focus:!ring-0" />
                <Input label="Location" name="location" value={editingEvent.location} onChange={handleEditChange} required className="mb-4 focus:!ring-0" />
                <Input label="Time" name="time" type="datetime-local" value={editingEvent.time} onChange={handleEditChange} required className="mb-4 focus:!ring-0" />
                <div className="mb-4 border rounded-lg p-2 border-black">
                  <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Events" multiple={true} />
                </div>
                <div className="mb-4">
                  <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Events" multiple={true} />
                </div>

                {/* Existing images with delete option */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {editingEvent.images?.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`Event ${idx}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          // Remove the selected image from images array
                          const updatedImages = editingEvent.images.filter((_, i) => i !== idx);
                          setEditingEvent({ ...editingEvent, images: updatedImages });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
                      >
                        <FaTrash/>
                      </button>
                    </div>
                  ))}
                </div>

                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">Save</Button>
              </form>
            </div>
          </div>
        )}

        {/* Viewing Dialog */}
        {viewingEvent && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isViewingDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 overflow-y-auto shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleViewingDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="text-2xl font-semibold mb-4">{viewingEvent.title}</h4>
              <p>{viewingEvent.description}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllEvents;
