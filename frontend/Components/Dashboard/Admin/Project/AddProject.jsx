import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Typography, Button, Input, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTrash } from 'react-icons/fa';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [projectStatus, setProjectStatus] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  // Remove selected image from preview
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (startYear && endYear && endYear < startYear) {
      toast.error('End year cannot be earlier than start year');
      return;
    }
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    const duration = `${startYear.getFullYear()}-${endYear.getFullYear()}`;
    try {
      await AxiosRequest.post(
        '/api/project/addProject',
        { title, area, description, duration, projectStatus, images },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Project added successfully');
      setTitle('');
      setArea('');
      setDescription('');
      setStartYear(null);
      setEndYear(null);
      setProjectStatus('');
      setImages([]);
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : 'Server error');
    }
  };

  return (
    <div className="flex flex-col items-center text-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins px-4 md:px-8 lg:px-16">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 max-w-md w-full bg-white rounded-lg shadow-lg scroll-y-auto"
      >
        <Typography variant="h4" className="mb-6 text-black">
          Add Project
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <Input
              label="Title"
              type="text"
              color="black"
              className="focus:!ring-0"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Area */}
          <div className="mb-4">
            <Input
              label="Area"
              type="text"
              color="black"
              className="focus:!ring-0"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
              placeholder="Enter project description..."
              required
            />
          </div>

          {/* Start Year */}
          <div className="mb-4 grid">
            <DatePicker
              selected={startYear}
              onChange={(date) => setStartYear(date)}
              showYearPicker
              dateFormat="yyyy"
              customInput={<Input label="Start Year" color="black" className="focus:!ring-0" />}
            />
          </div>

          {/* End Year */}
          <div className="mb-4 grid">
            <DatePicker
              selected={endYear}
              onChange={(date) => setEndYear(date)}
              showYearPicker
              dateFormat="yyyy"
              customInput={<Input label="End Year" color="black" className="focus:!ring-0" />}
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <Select
              label="Project Status"
              value={projectStatus}
              onChange={(e) => setProjectStatus(e)}
              required
            >
              <Option value="Pending">Pending</Option>
              <Option value="Ongoing">Ongoing</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </div>

          {/* Image Upload */}
          <div className="mb-4 text-left">
            <label className="block mb-1 text-gray-700 font-medium">Upload Images</label>
            <CloudinaryUpload
              onUploadSuccess={(urlOrUrls) => {
                if (!urlOrUrls) return;

                setImages((prev) => {
                  if (Array.isArray(urlOrUrls)) {
                    const validUrls = urlOrUrls
                      .map((u) => (typeof u === 'object' ? u.secure_url : u))
                      .filter((u) => typeof u === 'string' && u.startsWith('http'));
                    return [...prev, ...validUrls];
                  } else {
                    const singleUrl =
                      typeof urlOrUrls === 'object' ? urlOrUrls.secure_url : urlOrUrls;
                    if (typeof singleUrl === 'string' && singleUrl.startsWith('http')) {
                      return [...prev, singleUrl];
                    }
                  }
                  return prev;
                });
              }}
              folder="Projects"
              isSubmitted={isSubmitted}
              setIsSubmitted={setIsSubmitted}
              multiple={true}
            />
          </div>

          {/* Preview uploaded images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-20 h-20">
                  <img
                    src={img}
                    alt={`Project ${idx}`}
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

          <Button
            type="submit"
            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
          >
            Add Project
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddProject;
