import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa'; // Import Close icon from Font Awesome

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewingBlog, setViewingBlog] = useState(null); // State for the blog being viewed fully
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await AxiosRequest.get('/api/blogs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        toast.error(err.response ? err.response.data.message : 'Server error');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleEditClick = (blog) => {
    setEditingBlog(blog);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await AxiosRequest.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(blogs.filter(blog => blog._id !== id));
      toast.success('Blog deleted successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEditingBlog(null);
    setViewingBlog(null); // Reset the viewing blog state when dialog closes
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { _id, title, description, thumbnailUrl } = editingBlog;
      const response = await AxiosRequest.put(`/api/blogs/${_id}`, { title, description, thumbnailUrl }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBlogs(blogs.map(blog => (blog._id === _id ? response.data : blog)));
      handleDialogClose();
      toast.success('Blog updated successfully');
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingBlog({ ...editingBlog, [name]: value });
  };

  const handleImageUploadSuccess = (url) => {
    setEditingBlog({ ...editingBlog, thumbnailUrl: url });
  };

  const handleReadMoreClick = (blog) => {
    setViewingBlog(blog);
    setIsDialogOpen(true);
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
        <Typography variant="h2" className="mb-6 text-white">All Blogs</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6 mb-6 shadow-lg rounded-lg bg-white flex flex-col h-full">
                <Typography variant="h5" className="mb-4 text-black text-lg sm:text-sm md:text-md lg:text-lg">
                  {blog.title}
                </Typography>
                <Typography variant="body1" className="mb-4 text-black text-base sm:text-sm md:text-md lg:text-lg">
                  {viewingBlog && viewingBlog._id === blog._id ? blog.description : blog.description.length > 20 ? `${blog.description.slice(0, 20)}...` : blog.description}
                  {blog.description.length > 20 && (
                    <span
                      className="cursor-pointer text-blue-500"
                      onClick={() => handleReadMoreClick(blog)}
                    >
                      Read More
                    </span>
                  )}
                </Typography>
                {blog.thumbnailUrl && (
                  <img src={blog.thumbnailUrl} alt={blog.title} className="mb-4 w-36 self-center h-32 object-cover rounded-lg" />
                )}
                <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleEditClick(blog)}>
                  Edit
                </Button>
                <Button className="w-full bg-red-500 mt-2 shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleDeleteClick(blog._id)}>
                  Delete
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {editingBlog && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6">
            <div className="flex justify-end">
                <FaTimes className="cursor-pointer text-black hover:text-black absolute top-3 right-3 h-5 w-5" onClick={handleDialogClose} />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Edit Blog
              </h4>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-6">
                  <Input
                    label="Title"
                    type="text"
                    color="black"
                    className="focus:!ring-0"
                    name="title"
                    value={editingBlog.title}
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
                    value={editingBlog.description}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                {editingBlog.thumbnailUrl && (
                  <div className='flex items-center justify-center mb-6'>
                  <img src={editingBlog.thumbnailUrl} alt={editingBlog.title} className="w-36  h-32 rounded-lg" />
                  </div>
                )}
                <div className="mb-6">
                  <div className="mt-2 border rounded-lg p-2 border-black">
                    <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="Blogs" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
                  Update Blog
                </Button>
              </form>
            </div>
          </div>
        )}

        {viewingBlog && (
          <div className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300 ${isDialogOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="relative mx-auto flex w-full max-w-[30rem] max-h-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md p-6 overflow-y-auto">
              <div className="flex justify-end">
                <FaTimes className="cursor-pointer text-black hover:text-black absolute top-3 right-3 h-5 w-5" onClick={handleDialogClose} />
              </div>
              <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-4">
                {viewingBlog.title}
              </h4>
              <p className="text-base leading-relaxed text-gray-700 mb-4">
                {viewingBlog.description}
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AllBlogs;
