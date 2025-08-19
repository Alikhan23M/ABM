import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins text-white text-center">
      <div className="flex flex-col items-center">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-6xl mb-4" />
        <Typography variant="h1" className="text-4xl font-bold mb-4">
          404
        </Typography>
      </div>
      <Typography variant="h5" className="text-2xl mb-8">
        Page Not Found
      </Typography>
      <Typography className="mb-8">
        The page you are looking for does not exist.
      </Typography>
      <div className="flex flex-col gap-4">
        <Button
          onClick={handleGoHome}
          className="bg-black text-white font-bold py-2 px-4 hover:shadow-black shadow-md rounded-lg"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
