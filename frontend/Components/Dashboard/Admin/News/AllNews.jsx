import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa';



const AllNews = () => {
  const [news, setNews] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [viewingNews, setViewingNews] = useState(null);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await AxiosRequest.get('/api/news/news', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNews(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchNews();
  }, [token]);

  const handleEditClick = (newsItem) => {
    setEditingNews(newsItem);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/news/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNews(news.filter(item => item._id !== id));
      toast.success('News article deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingNews(null);
  };

  const handleViewClick = (newsItem) => {
    setViewingNews(newsItem);
    setIsViewingDialogOpen(true);
  };

  // Function to close viewing dialog
  const handleViewingDialogClose = () => {
    setIsViewingDialogOpen(false);
    setViewingNews(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, content, author, imageUrl } = editingNews;
      const response = await AxiosRequest.put(`/api/news/news/${_id}`, { title, content, author, imageUrl }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNews(news.map(item => (item._id === _id ? response.data : item)));
      handleDialogClose();
      toast.success('News article updated successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingNews({ ...editingNews, [name]: value });
  };

  const handleImageUploadSuccess = (url) => {
    setEditingNews({ ...editingNews, imageUrl: url });
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
        <Typography variant="h2" className="mb-6 text-white">All News Articles</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">{item.title}</Typography>
                <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">
                  {item.content.length > 20 ? `${item.content.slice(0, 20)}...` : item.content}
                  {item.content.length > 20 && (
                    <span className="cursor-pointer text-blue-500" onClick={() => handleViewClick(item)}>
                      Read More
                    </span>
                  )}
                </Typography>
                <Typography variant="paragraph" className="mb-2 text-gray-500">Author: {item.author}</Typography>
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="mb-4 w-36 self-center h-32 object-cover rounded-lg" />
                )}
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(item)}>
                  Edit
                </Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(item._id)}>
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingNews && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit News Article
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                  <Input
                    label="Title"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="title"
                    value={editingNews.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Input
                    label="Content"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="content"
                    value={editingNews.content}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Input
                    label="Author"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="author"
                    value={editingNews.author}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="News" />
                  </div>
                </div>
                 {editingNews.imageUrl && (
                              <div className="relative inline-block">
                                <img
                                  src={editingNews.imageUrl}
                                  alt="Uploaded Preview"
                                  className="w-20 h-20 object-cover rounded border border-gray-300"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingNews({ ...editingNews, imageUrl: '' });
                                    setUploaded(false);
                                  }}
                                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                                >
                                  <FaTimes size={12} />
                                </button>
                              </div>
                            )}
                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                  Update News
                </Button>
              </form>
            </div>
          </div>
        )}
        {viewingNews && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isViewingDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 overflow-y-auto shadow-md p-6">
              <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleViewingDialogClose}>
                <FaTimes className="text-black text-xl" />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-4">
                {viewingNews.title}
              </h4>
              <p className="block font-sans text-base font-light leading-relaxed antialiased text-inherit">
                {viewingNews.content}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};


export default AllNews;
