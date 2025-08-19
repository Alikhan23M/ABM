import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import Sidebar from '../SideBar/Sidebar';
import AxiosRequest from '../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../State/Reducers/tokenSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Spinner, Avatar, Typography } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import logo from '../../assets/ABM.png';

Modal.setAppElement('#root'); // This is important for accessibility

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await AxiosRequest.get('api/user/getUserById', config);
        setUser(response.data);
        setUserRole(response.data.role);
        setLoading(false);
        if (response.data.role === 'admin' || response.data.role === 'moderator' || response.data.role === 'editor') {
          setModalIsOpen(true);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
      }
    };

    fetchuser();
  }, [token]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins">
        <Spinner className="h-12 w-12 text-black" />
      </div>
    );
  }

  if (userRole !== 'admin' && userRole !== 'moderator' && userRole !== 'editor') {
    return (
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins h-screen text-white text-center">
        <Toaster />
        <h1 className="text-3xl font-bold mb-4">Insufficient Privileges</h1>
        <p className="mb-8">You do not have the necessary permissions to access this page.</p>
        <div className='flex flex-col gap-4'>
          <Button
            onClick={() => navigate('/login')}
            className="bg-black text-white font-bold py-2 px-4 hover:shadow-black shadow-md rounded-lg"
          >
            Login As Admin
          </Button>
          <Button
            onClick={() => navigate('/home')}
            className="bg-black text-white font-bold py-2 px-4 shadow-gray-900 shadow-md rounded-lg hover:bg-gray-800"
          >
            Go To Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && isMobile && (
        <aside className="fixed inset-0 bg-gray-900 text-white z-50 transition-transform duration-200 ease-in-out">
          <Sidebar isMobile={isMobile} closeSidebar={toggleSidebar} userRole={userRole} />
        </aside>
      )}
      {!isMobile && (
        <aside className="flex">
          <Sidebar userRole={userRole} />
        </aside>
      )}
      <main className="flex flex-col w-full">
        {isMobile && (
          <header className="w-full bg-gray-900 text-white flex items-center justify-between p-4">
            <button onClick={toggleSidebar}>
              <FaBars className="text-2xl" />
            </button>
            <h1 className="text-xl">Admin Dashboard</h1>
          </header>
        )}
        <div className="md:flex-grow overflow-y-auto dashboard-1-scrollbar">
          {children}
        </div>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white relative p-6 md:p-8 rounded-lg shadow-lg max-w-md md:max-w-2xl w-full">
        <div className="absolute top-2 right-2 p-2 cursor-pointer" onClick={closeModal}>
                <FaTimes className="text-black text-xl" />
              </div>
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 flex flex-col md:flex-row justify-center gap-4 items-center">
            <Avatar src={logo} alt="Website Logo" size="lg" className="bg-white" />
            Welcome To ABM
          </h1>
          <div className="text-xl md:text-3xl text-black mb-4 flex flex-col md:flex-row justify-center gap-4 items-center">
            <Typography variant="h4" className="flex items-center">
              <span className="animate-wave text-4xl mr-2">👋</span>Hey
            </Typography>
            <Typography variant="h4" className="flex items-center">
              <Avatar src={user?.picUrl || 'https://via.placeholder.com/150'} alt="User Avatar" size="lg" className="mr-2" /> {user.name} {/* Display user name here */}
            </Typography>
          </div>
          <p className="text-sm md:text-lg text-black max-w-xs md:max-w-2xl">
            {isMobile
              ? `Welcome to the admin dashboard of ABM. Here, you can manage all the aspects of your website including user management, content creation, and more. Use the hamburger menu to access different sections of the admin panel.`
              : `Welcome to the admin dashboard of ABM. Here, you can manage all the aspects of your website including user management, content creation, and more. Use the sidebar menu to access different sections of the admin panel.`
            }
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminLayout;

