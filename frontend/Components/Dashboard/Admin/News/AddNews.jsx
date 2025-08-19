import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Textarea, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTimes } from 'react-icons/fa';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploaded, setUploaded] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await AxiosRequest.post('/api/news/news', {
        title: title,
        content: content,
        author: author,
        imageUrl: imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('News added successfully');
      setTitle('');
      setContent('');
      setAuthor('');
      setImageUrl('');
      setUploaded(false);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  const handleImageUploadSuccess = (url) => {
    setImageUrl(url);
    setUploaded(true);
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
        <Card className="p-6 shadow-lg rounded-lg bg-white flex flex-col w-full">
          <Typography variant="h4" className="mb-6 text-black">Add News</Typography>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <Input
              label="Title"
              type="text"
              color="black"
              className="focus:!ring-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Content"
              size="md"
              color="black"
              className="rounded-md resize-none focus:border-black focus:ring-0"
              value={content}
              required
              rows={4}
              onChange={(e) => setContent(e.target.value)}
            />
            <Input
              label="Author"
              type="text"
              color="black"
              className="focus:!ring-0"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <div className="mb-6 border rounded-lg p-2 border-black">
              <CloudinaryUpload onUploadSuccess={handleImageUploadSuccess} folder="News" isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
            </div>
            {imageUrl && (
              <div className="relative inline-block">
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="w-20 h-20 object-cover rounded border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageUrl('');
                    setUploaded(false);
                  }}
                  className="absolute -top-2 -left-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            )}
            <Button type="submit"
              disabled={!uploaded}  // Disable submit button until image is uploaded and URL is set
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800">
              Add News
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddNews;
