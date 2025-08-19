import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AxiosRequest from '../../AxiosRequest/AxiosRequest';
import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Card, Typography, Spinner } from '@material-tailwind/react';
import {toast,Toaster} from 'react-hot-toast';

const Search = () => {
  const [results, setResults] = useState({});
  const [expandedItem, setExpandedItem] = useState(null); // Track expanded item
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const response = await AxiosRequest.get(`/api/search/?q=${query}`);
        setResults(response.data);
      } catch (error) {
        toast.error('Error fetching search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  // Filter out categories with empty arrays
  const filteredResults = Object.keys(results).reduce((acc, key) => {
    if (results[key].length > 0) {
      acc[key] = results[key];
    }
    return acc;
  }, {});

  // Handle click on Read More
  const handleReadMore = (item) => {
    setExpandedItem(item);
  };

  // Handle close dialog
  const handleCloseDialog = () => {
    setExpandedItem(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F6F1EE]">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }


  return (
    <>
    {Object.keys(filteredResults).length > 0 ?( 
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start text-center justify-center min-h-screen bg-[#F6F1EE] font-poppins px-4 md:px-8 lg:px-16">
      {Object.keys(filteredResults).map((key) => (
        <motion.div
          key={key}
          className="text-center mt-[3vh] mb-[3vh] space-y-2 items-center justify-center bg-white rounded-lg shadow-md p-4 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ minHeight: '300px' }} // Example height, adjust as needed
        >
          <h2 className="text-xl font-bold mb-2">{key}</h2>
          <ul>
            {filteredResults[key].map((item) => (
              <li key={item._id} className="mb-4">
                <div className={`transition-height overflow-hidden ${expandedItem === item ? 'h-auto' : 'h-20'}`}>
                  <span className="font-semibold">{item.title || item.name || item.message}</span>
                  {item.description && <p className="text-sm mt-[2vh] text-gray-600">{item.description.substring(0, 100)}...</p>}
                </div>
                {/* Center image with flexbox */}
                <div className="flex justify-center mt-[2vh]">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title || item.name || item.message} className="w-16 h-16 object-cover rounded-lg" />
                  )}
                  {item.videoUrl && (
                    <video src={item.videoUrl} controls className="w-full h-32 object-cover rounded-lg" />
                  )}
                </div>
                {/* Read more button */}
                {item.description && (
                  <button
                    className="text-blue-500 mt-2"
                    onClick={() => handleReadMore(item)}
                  >
                    {expandedItem != item && 'Read more'}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
      {/* Dialog for expanded item */}
      {expandedItem && (
        <Dialog open={!!expandedItem} size="lg" handler={handleCloseDialog}>
          <div className="text-center flex flex-col items-center justify-center">
            <DialogHeader>{expandedItem.title || expandedItem.name || expandedItem.message}</DialogHeader>
            <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={handleCloseDialog}>
              <FaTimes className="text-xl" color='red' />
            </div>
            <DialogBody divider className="overflow-y-auto max-h-96">
              <Typography variant="body1" className="text-black text-justify">{expandedItem.description}</Typography>
            </DialogBody>
            <DialogFooter>
            </DialogFooter>
          </div>
        </Dialog>
      )}
    </div>
    ):(
        <div className="gap-4 items-center text-center justify-center min-h-screen bg-[#F6F1EE] font-poppins px-4 md:px-8 lg:px-16">
            <Toaster/>
        <motion.div
          className="text-center justify-center items-center flex min-w-screen min-h-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className=" bg-white rounded-lg shadow-md p-4">
            <p className="text-gray-700 ">No results found</p>
          </div>
        </motion.div>
        </div>
      )}
      </>
  );
};

export default Search;
