import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Input, Spinner } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';

const UpdateSiteInfo = () => {
  const [siteInfo, setSiteInfo] = useState({
    logo: '',
    facebookURL: '',
    twitterURL: '',
    instagramURL: '',
    linkedinURL: '',
    youtubeURL: '',
  });

  const [loading, setLoading] = useState(true);
  const [uploaded, setUploaded] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  // Fetch existing site info
  useEffect(() => {
    const fetchSiteInfo = async () => {
      try {
        const response = await AxiosRequest.get('/api/siteinfo');
        setSiteInfo(response.data);
      } catch (error) {
        toast.error('Failed to fetch site info');
      } finally {
        setLoading(false);
      }
    };
    fetchSiteInfo();
  }, []);

  const handleChange = (field, value) => {
    setSiteInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUploadSuccess = (url) => {
    setSiteInfo(prev => ({ ...prev, logo: url }));
    setUploaded(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatePayload = {};
      Object.keys(siteInfo).forEach(field => {
        if (siteInfo[field] && siteInfo[field].trim() !== '') {
          updatePayload[field] = siteInfo[field].trim();
        }
      });

      await AxiosRequest.put('/api/siteinfo', updatePayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Site info updated successfully');
      setIsSubmitted(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Server error');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 max-w-lg w-full"
      >
        <Card className="p-6 shadow-lg rounded-lg bg-white flex flex-col w-full">
          <Typography variant="h4" className="mb-6 text-black">Update Site Info</Typography>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Logo Upload */}
            <div className="mb-4 border rounded-lg p-2 border-black">
              <CloudinaryUpload
                onUploadSuccess={handleImageUploadSuccess}
                folder="SiteInfo"
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
              />
              {siteInfo.logo && (
                <img
                  src={siteInfo.logo}
                  alt="Logo Preview"
                  className="mt-4 w-32 h-32 object-contain border rounded"
                />
              )}
            </div>

            {/* Social Links */}
            <Input
              label="Facebook URL"
              type="url"
              color="black"
              value={siteInfo.facebookURL}
              onChange={(e) => handleChange('facebookURL', e.target.value)}
            />
            <Input
              label="Twitter URL"
              type="url"
              color="black"
              value={siteInfo.twitterURL}
              onChange={(e) => handleChange('twitterURL', e.target.value)}
            />
            <Input
              label="Instagram URL"
              type="url"
              color="black"
              value={siteInfo.instagramURL}
              onChange={(e) => handleChange('instagramURL', e.target.value)}
            />
            <Input
              label="LinkedIn URL"
              type="url"
              color="black"
              value={siteInfo.linkedinURL}
              onChange={(e) => handleChange('linkedinURL', e.target.value)}
            />
            <Input
              label="YouTube URL"
              type="url"
              color="black"
              value={siteInfo.youtubeURL}
              onChange={(e) => handleChange('youtubeURL', e.target.value)}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            >
              Update Site Info
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default UpdateSiteInfo;
