// import React, { useState } from 'react';
// import { FaHome, FaUser, FaUsers, FaArrowLeft, FaArrowRight, FaTimes, FaWarehouse, FaBlog, FaEnvelopeOpenText, FaImage, FaImages, FaNewspaper, FaRegNewspaper, FaRegClipboard, FaPalette, FaInfoCircle, FaLink } from 'react-icons/fa';
// import { BsBriefcase, BsBriefcaseFill, BsCameraVideo, BsCameraVideoFill, BsEnvelope, BsEnvelopeFill, BsImage, BsImages, BsProjector, BsProjectorFill, BsTelephone, BsPersonFillAdd, BsPersonFill, BsBoxArrowLeft, BsBoxArrowDownRight, BsBoxArrowRight, BsQuestionCircle, BsGraphUp, BsInfo, BsFileEarmarkText } from 'react-icons/bs';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setRoleAction } from '../State/Reducers/roleSlice';
// import { setTokenAction } from '../State/Reducers/tokenSlice';
// import Swal from 'sweetalert2';
// import { selectUserId, setUserIdAction } from '../State/Reducers/userIdSlice';
// import AxiosRequest from '../AxiosRequest/AxiosRequest';
// import { MdCategory, MdMessage, MdOutlineSettingsApplications, MdOutlineSettingsOverscan } from 'react-icons/md';

// const Sidebar = ({ isMobile, closeSidebar, userRole }) => {
//   const [isSidebarVisible, setIsSidebarVisible] = useState(true);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const storedUserId = localStorage.getItem('userId');
//   const userId = useSelector(selectUserId) || storedUserId;
// console.log('User Role in Sidebar', userRole);
//   const sidebarItems = [
//     { name: 'Home', path: '/home', icon: <FaHome /> },
//     { name: 'Users', path: '/users', icon: <FaUsers /> },
//     userRole === 'admin' ? { name: 'Add User', path: '/add-user', icon: <FaUser /> } : null,
//     { name: 'Update About', path: '/update-about', icon: <FaWarehouse /> },
//     { name: 'Create Blogs', path: '/create-blogs', icon: <FaBlog /> },
//     { name: 'All Blogs', path: '/all-blogs', icon: <FaBlog /> },
//     { name: 'Add Career', path: '/add-career', icon: <BsBriefcase /> },
//     { name: 'All Careers', path: '/all-careers', icon: <BsBriefcaseFill /> },
//     { name: 'All Application', path: '/all-applications', icon: <FaEnvelopeOpenText /> },
//     { name: 'Add Slider Image', path: '/add-slider-image', icon: <FaImage /> },
//     { name: 'All Slider Images', path: '/all-slider-image', icon: <FaImages /> },
//     { name: 'Create Event', path: '/create-event', icon: <BsEnvelope /> },
//     { name: 'All Events', path: '/all-events', icon: <BsEnvelopeFill /> },
//     { name: 'Add Media', path: '/add-media', icon: <BsImage /> },
//     { name: 'All Media', path: '/all-media', icon: <BsImages /> },
//     { name: 'Add Video', path: '/add-video', icon: <BsCameraVideo /> },
//     { name: 'All Videos', path: '/all-videos', icon: <BsCameraVideoFill /> },
//     { name: 'Add News', path: '/add-news', icon: <FaNewspaper /> },
//     { name: 'All News', path: '/all-news', icon: <FaRegNewspaper /> },
//     { name: 'Add Partner', path: '/add-partner', icon: <BsPersonFillAdd /> },
//     { name: 'All Partners', path: '/all-partners', icon: <BsPersonFill /> },
//     { name: 'Add Project', path: '/add-project', icon: <BsProjector /> },
//     { name: 'All Projects', path: '/all-projects', icon: <BsProjectorFill /> },
//     { name: 'Add Member', path: '/add-member', icon: <BsPersonFillAdd /> },
//     { name: 'All Members', path: '/all-members', icon: <BsPersonFill /> },
//     { name: 'Create Tender', path: '/create-tender', icon: <BsPersonFillAdd /> },
//     { name: 'All Tenders', path: '/all-tenders', icon: <BsPersonFill /> },
//     { name: 'Contact US', path: '/update-contact-us', icon: <BsTelephone /> },
//     {name:'Site Info', path:'/update-site-info', icon:<FaLink/>},
//     {name:'Categories', path:'/categories', icon:<MdCategory/>},
//     {name:'Navbar Setting', path:'/navbar-setting', icon:<MdOutlineSettingsOverscan/>},
//     {name:'Footer Setting', path:'/footer-management', icon:<MdOutlineSettingsApplications/>},
//     {name:'Body Cards',path:'/create-bodycard',icon:<FaRegClipboard/>},
//     {name:'Help Options', path:'/help-option', icon:<BsQuestionCircle/>},
//     {name:'Stats Section',path:'/stats',icon:<BsGraphUp/>},
//     {name:'Director Message',path:'/director-message',icon:<MdMessage/>},
//     {name:'Color Theme',path:'/color-theme',icon:<FaPalette/>},
//     {name:'Section Info', path:'/section-info', icon:<BsInfo/>},
//     {name:'Manage Pages',path:'/manage-pages',icon:<BsFileEarmarkText/>}
//   ].filter(Boolean);

//   const logoutFunc = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, log out!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         AxiosRequest.post('/api/user/logout', { userId }).then(() => {
//           dispatch(setRoleAction(null));
//           dispatch(setTokenAction(null));
//           dispatch(setUserIdAction(null));
//           navigate('/home');
//         });
//       }
//     });
//   };

//   const toggleSidebar = () => {
//     setIsSidebarVisible(!isSidebarVisible);
//   };

//   return (
//     <>
//       <div className="flex">
//         <div className={`bg-gray-900 text-white ${isMobile ? 'fixed inset-0 z-50  w-full' : 'h-full'} ${isSidebarVisible && !isMobile ? 'w-64' : 'w-20'} p-4 overflow-y-auto dashboard-1-scrollbar transition-all duration-300`}>
//           {isMobile && (
//             <div className="flex items-center justify-between mb-4">
//               <h1 className="text-xl">Menu</h1>
//               <button onClick={closeSidebar}>
//                 <FaTimes className="text-2xl" />
//               </button>
//             </div>
//           )}
//           <ul className="space-y-4">
//             {sidebarItems.map((item, i) => (
//               <NavLink
//                 to={item.path}
//                 key={i}
//                 className={({ isActive }) =>
//                   `flex items-center ${isSidebarVisible ? 'space-x-3' : 'justify-center'} p-2 rounded-lg transition-colors duration-200 ${
//                     isActive ? 'bg-gray-800 text-blue-500 font-semibold' : 'hover:bg-gray-800'
//                   }`
//                 }
//                 onClick={isMobile ? closeSidebar : null}
//               >
//                 <span className="text-xl">{item.icon}</span>
//                 {isSidebarVisible && <span className="text-lg">{item.name}</span>}
//               </NavLink>
//             ))}
//           </ul>
//           <div
//             className={`p-2 flex mt-[4vh] items-center ${isSidebarVisible ? 'space-x-3' : 'justify-center'} hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer`}
//             onClick={logoutFunc}
//           >
//             <span className="text-xl">
//             <BsBoxArrowRight/>
//             </span>
//             {isSidebarVisible && <p className="text-lg">Logout</p>}
//           </div>
//         </div>
//         {!isMobile && (
//           <button
//             onClick={toggleSidebar}
//             className={`bg-black text-white p-3 rounded-full shadow-md shadow-black fixed top-4 ${isSidebarVisible ? 'left-72' : 'left-28'} transition-all duration-300 z-50`}
//           >
//             {isSidebarVisible ? <FaArrowLeft className="text-2xl" /> : <FaArrowRight className="text-2xl" />}
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default Sidebar;





import React, { useState } from 'react';
import { FaHome, FaUser, FaUsers, FaArrowLeft, FaArrowRight, FaTimes, FaWarehouse, FaBlog, FaEnvelopeOpenText, FaImage, FaImages, FaNewspaper, FaRegNewspaper, FaRegClipboard, FaPalette, FaLink } from 'react-icons/fa';
import { BsBriefcase, BsBriefcaseFill, BsCameraVideo, BsCameraVideoFill, BsEnvelope, BsEnvelopeFill, BsImage, BsImages, BsProjector, BsProjectorFill, BsTelephone, BsPersonFillAdd, BsPersonFill, BsBoxArrowRight, BsQuestionCircle, BsGraphUp, BsInfo, BsFileEarmarkText } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setRoleAction } from '../State/Reducers/roleSlice';
import { setTokenAction } from '../State/Reducers/tokenSlice';
import Swal from 'sweetalert2';
import { selectUserId, setUserIdAction } from '../State/Reducers/userIdSlice';
import AxiosRequest from '../AxiosRequest/AxiosRequest';
import { MdCategory, MdMessage, MdOutlineSettingsApplications, MdOutlineSettingsOverscan } from 'react-icons/md';

const Sidebar = ({ isMobile, closeSidebar, userRole }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // 🔎 search state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUserId = localStorage.getItem('userId');
  const userId = useSelector(selectUserId) || storedUserId;

  const sidebarItems = [
    { name: 'Home', path: '/home', icon: <FaHome /> },
    { name: 'Users', path: '/users', icon: <FaUsers /> },
    userRole === 'admin' ? { name: 'Add User', path: '/add-user', icon: <FaUser /> } : null,
    { name: 'Update About', path: '/update-about', icon: <FaWarehouse /> },
    { name: 'Create Blogs', path: '/create-blogs', icon: <FaBlog /> },
    { name: 'All Blogs', path: '/all-blogs', icon: <FaBlog /> },
    { name: 'Add Career', path: '/add-career', icon: <BsBriefcase /> },
    { name: 'All Careers', path: '/all-careers', icon: <BsBriefcaseFill /> },
    { name: 'All Application', path: '/all-applications', icon: <FaEnvelopeOpenText /> },
    { name: 'Add Slider Image', path: '/add-slider-image', icon: <FaImage /> },
    { name: 'All Slider Images', path: '/all-slider-image', icon: <FaImages /> },
    { name: 'Create Event', path: '/create-event', icon: <BsEnvelope /> },
    { name: 'All Events', path: '/all-events', icon: <BsEnvelopeFill /> },
    { name: 'Add Media', path: '/add-media', icon: <BsImage /> },
    { name: 'All Media', path: '/all-media', icon: <BsImages /> },
    { name: 'Add Video', path: '/add-video', icon: <BsCameraVideo /> },
    { name: 'All Videos', path: '/all-videos', icon: <BsCameraVideoFill /> },
    { name: 'Add News', path: '/add-news', icon: <FaNewspaper /> },
    { name: 'All News', path: '/all-news', icon: <FaRegNewspaper /> },
    { name: 'Add Partner', path: '/add-partner', icon: <BsPersonFillAdd /> },
    { name: 'All Partners', path: '/all-partners', icon: <BsPersonFill /> },
    { name: 'Add Project', path: '/add-project', icon: <BsProjector /> },
    { name: 'All Projects', path: '/all-projects', icon: <BsProjectorFill /> },
    { name: 'Add Member', path: '/add-member', icon: <BsPersonFillAdd /> },
    { name: 'All Members', path: '/all-members', icon: <BsPersonFill /> },
    { name: 'Create Tender', path: '/create-tender', icon: <BsPersonFillAdd /> },
    { name: 'All Tenders', path: '/all-tenders', icon: <BsPersonFill /> },
    { name: 'Contact US', path: '/update-contact-us', icon: <BsTelephone /> },
    { name: 'Site Info', path: '/update-site-info', icon: <FaLink /> },
    { name: 'Categories', path: '/categories', icon: <MdCategory /> },
    { name: 'Navbar Setting', path: '/navbar-setting', icon: <MdOutlineSettingsOverscan /> },
    { name: 'Footer Setting', path: '/footer-management', icon: <MdOutlineSettingsApplications /> },
    { name: 'Body Cards', path: '/create-bodycard', icon: <FaRegClipboard /> },
    { name: 'Help Options', path: '/help-option', icon: <BsQuestionCircle /> },
    { name: 'Stats Section', path: '/stats', icon: <BsGraphUp /> },
    { name: 'Director Message', path: '/director-message', icon: <MdMessage /> },
    { name: 'Color Theme', path: '/color-theme', icon: <FaPalette /> },
    { name: 'Section Info', path: '/section-info', icon: <BsInfo /> },
    { name: 'Manage Pages', path: '/manage-pages', icon: <BsFileEarmarkText /> },
  ].filter(Boolean);

  // 🔎 filter items by search query
  const filteredItems = sidebarItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const logoutFunc = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!',
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosRequest.post('/api/user/logout', { userId }).then(() => {
          dispatch(setRoleAction(null));
          dispatch(setTokenAction(null));
          dispatch(setUserIdAction(null));
          navigate('/home');
        });
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="flex">
        <div
          className={`bg-gray-900 text-white ${isMobile ? 'fixed inset-0 z-50  w-full' : 'h-full'} 
          ${isSidebarVisible && !isMobile ? 'w-64' : 'w-20'} 
          p-4 overflow-y-auto dashboard-1-scrollbar transition-all duration-300`}
        >
          {/* Mobile Header */}
          {isMobile && (
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl">Menu</h1>
              <button onClick={closeSidebar}>
                <FaTimes className="text-2xl" />
              </button>
            </div>
          )}

          {/* 🔎 Search bar */}
          {isSidebarVisible && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Sidebar Items */}
          <ul className="space-y-2">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, i) => (
                <NavLink
                  to={item.path}
                  key={i}
                  className={({ isActive }) =>
                    `flex items-center ${isSidebarVisible ? 'space-x-3' : 'justify-center'} p-2 rounded-lg transition-colors duration-200 ${
                      isActive ? 'bg-gray-800 text-blue-500 font-semibold' : 'hover:bg-gray-800'
                    }`
                  }
                  onClick={isMobile ? closeSidebar : null}
                >
                  <span className="text-xl">{item.icon}</span>
                  {isSidebarVisible && <span className="text-sm">{item.name}</span>}
                </NavLink>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No results</p>
            )}
          </ul>

          {/* Logout Button */}
          <div
            className={`p-2 flex mt-6 items-center ${isSidebarVisible ? 'space-x-3' : 'justify-center'} hover:bg-gray-800 rounded-lg transition-colors duration-200 cursor-pointer`}
            onClick={logoutFunc}
          >
            <span className="text-xl">
              <BsBoxArrowRight />
            </span>
            {isSidebarVisible && <p className="text-sm">Logout</p>}
          </div>
        </div>

        {/* Toggle Sidebar Button */}
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className={`bg-black text-white p-3 rounded-full shadow-md shadow-black fixed top-4 ${isSidebarVisible ? 'left-72' : 'left-28'} transition-all duration-300 z-50`}
          >
            {isSidebarVisible ? <FaArrowLeft className="text-2xl" /> : <FaArrowRight className="text-2xl" />}
          </button>
        )}
      </div>
    </>
  );
};

export default Sidebar;
