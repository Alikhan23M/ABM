import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Card, Typography, Button, Spinner, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import { FaTimes } from 'react-icons/fa';

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await AxiosRequest.get('/api/application/applications', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        setApplications(response.data);
      } catch (error) {
        toast.error(error.response ? error.response.data.message : 'Failed to fetch applications');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedApplication(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 py-10 font-poppins">
      <Toaster />
      <Typography variant="h3" className="text-white mb-8 text-center">All Applications</Typography>

      {applications.length === 0 ? (
        <Typography variant="body1" className="text-white text-center">No applications found.</Typography>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 max-w-4xl w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((application) => (
              <motion.div
                key={application._id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6 flex flex-col items-center text-center bg-white shadow-lg rounded-lg">
                  <Typography variant="h5" className="mb-4 text-black text-base sm:text-lg md:text-xl lg:text-2xl">{application.userId.name}</Typography>
                  <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">{application.userId.email}</Typography>
                  <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">Career: {application.careerId.title}</Typography>
                  <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Application Date: {new Date(application.appliedAt).toLocaleDateString()}</Typography>
                  <Button className="mt-auto w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800" onClick={() => handleViewApplication(application)}>
                    View Application
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedApplication && (
        <Dialog open={isDialogOpen} handler={handleCloseDialog}>
                      <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleCloseDialog}>
              <FaTimes className="text-xl" color='red' />
            </div>
          <DialogHeader>Application Details</DialogHeader>
          <DialogBody divider className="overflow-y-auto max-h-96">
            <Typography variant="h6" className="mb-4 text-black text-sm sm:text-base md:text-lg">Name: {selectedApplication.userId.name}</Typography>
            <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">{selectedApplication.userId.email}</Typography>
            <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">Career: {selectedApplication.careerId.title}</Typography>
            <Typography variant="body2" className="mb-4 text-black text-xs sm:text-sm md:text-base">Resume URL: <a href={selectedApplication.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{selectedApplication.resumeUrl}</a></Typography>
            <Typography variant="body1" className="mb-4 text-black text-sm sm:text-base md:text-lg">Application Date: {new Date(selectedApplication.appliedAt).toLocaleDateString()}</Typography>
          </DialogBody>
          <DialogFooter>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
};

export default AllApplications;
