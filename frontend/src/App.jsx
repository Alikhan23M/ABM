import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css'
import Login from '../src/Components/Auth/Login/Login'; // Import your Login component
import ForgotPassword from '../src/Components/Auth/Forgot/ForgotPassword';
import ResetPassword from '../src/Components/Auth/Reset/ResetPassword';
import Home from '../src/Components/Home/Home';
import Profile from '../src/Components/Profile/Profile';
import Layout from './Components/Layout/Layout';
import AdminLayout from './Components/Layout/AdminLayout';
import AddUser from './Components/Dashboard/Admin/Users/AddUser';
import Users from './Components/Dashboard/Admin/Users/Users';
import UpdateAbout from './Components/Dashboard/Admin/About/UpdateAbout';
import CreateBlogs from './Components/Dashboard/Admin/Blogs/CreateBlogs';
import AllBlogs from './Components/Dashboard/Admin/Blogs/AllBlogs';
import AllCareer from './Components/Dashboard/Admin/Career/AllCareer';
import AddCareer from './Components/Dashboard/Admin/Career/AddCareer';
import AllApplications from './Components/Dashboard/Admin/Applications/AllApplications';
import AddSliderImage from './Components/Dashboard/Admin/SliderImage/AddSliderImage';
import AllSliderImages from './Components/Dashboard/Admin/SliderImage/AllSliderImages';
import CreateEvent from './Components/Dashboard/Admin/Event/CreateEvent';
import AllEvents from './Components/Dashboard/Admin/Event/AllEvents';
import AddPicture from './Components/Dashboard/Admin/Media/AddPicture';
import AllPictures from './Components/Dashboard/Admin/Media/AllPictures';
import AddNews from './Components/Dashboard/Admin/News/AddNews';
import AllNews from './Components/Dashboard/Admin/News/AllNews';
import AddPartner from './Components/Dashboard/Admin/Partner/AddPartner';
import AllPartners from './Components/Dashboard/Admin/Partner/AllPartners';
import AddProject from './Components/Dashboard/Admin/Project/AddProject';
import AllProjects from './Components/Dashboard/Admin/Project/AllProjects';
import AddMember from './Components/Dashboard/Admin/Members/AddMember';
import AllMembers from './Components/Dashboard/Admin/Members/AllMembers';
import CreateTender from './Components/Dashboard/Admin/Tender/CreateTender';
import AllTenders from './Components/Dashboard/Admin/Tender/AllTenders';
import AboutUs from './Components/Dashboard/User/AboutUs/AboutUs';
import VisionMission from './Components/Dashboard/User/AboutUs/Vision&Mission/VisionMission';
import PartnerOrg from './Components/Dashboard/User/AboutUs/PartnerOrg/PartnerOrg';
import ManagementTeam from './Components/Dashboard/User/AboutUs/ABMTeam/ManagementTeam/ManagementTeam';
import BRMTeam from './Components/Dashboard/User/AboutUs/ABMTeam/BRMTeam/BRMTeam';
import Projects from './Components/Dashboard/User/Projects/Projects';
import ProjectActivityPictures from './Components/Dashboard/User/Gallery/ProjectActivity/ProjectActivityPictures';
import News from './Components/Dashboard/User/Announcement/News/News';
import Career from './Components/Dashboard/User/Announcement/Career/Career';
import Tenders from './Components/Dashboard/User/Announcement/Tenders/Tenders';
import UpdateContactUs from './Components/Dashboard/Admin/ContactUs/UpdateContactUs';
import ContactUs from './Components/Dashboard/User/ContactUs/ContactUs';
import MessageFromExecDir from './Components/Header/Message/MessageFromExecDir';
import AddVideos from './Components/Dashboard/Admin/Videos/AddVideos';
import AllVideos from './Components/Dashboard/Admin/Videos/AllVideos';
import Videos from './Components/Dashboard/User/Gallery/Videos/Videos';
import Archives from './Components/Dashboard/User/Archives/Archives';
import Events from './Components/Dashboard/User/Events/Events';
import Search from './Components/Header/Search/Search';
import UpdatePassword from './Components/Dashboard/User/UpdatePassword/UpdatePassword';
import AdminLandingPage from './Components/Dashboard/Admin/LandingPage/AdminLandingPage';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';
import Upheader from './Components/Header/Search/Upheader';
import ScrollToTop from './Utilities/ScrollToTop';
import UpdateSiteInfo from './Components/Dashboard/Admin/SiteInfo/UodateSiteInfo';
import FooterManagement from './Components/Dashboard/Admin/Footer/FooterManagement';

import AddBodyCard from './Components/Dashboard/Admin/BodyCards/addBodyCards'
import HelpOptions from './Components/Dashboard/Admin/HelpOption/HelpOptions';
import Categories from './Components/Dashboard/Admin/Categories/Categories';
import Gallery from './Components/Dashboard/User/Gallery/Gallery';
import StatsAdminPage from './Components/Dashboard/Admin/StatsSection/StatsAdminPage';
import DirectorMessage from './Components/Dashboard/Admin/DirectorMessage/DirectorMessage';
import ManageColors from './Components/Dashboard/Admin/ColorTheme/ManageColors';
import SectionInfo from './Components/Dashboard/Admin/SectionInfo/SectionInfo';
import ManageNavbar from './Components/Dashboard/Admin/ManageNavbar/ManageNavbar';
import Page from './Components/Dashboard/User/DynamicPage/Page';
import ManagePages from './Components/Dashboard/Admin/ManagePages/ManagePages';
const App = () => {
    return (

        <Router>
            <ScrollToTop />
            <Upheader />
            <Routes>

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<NotFoundPage />} />
                
                
                <Route path="/:url" element={
                    <Layout>
                     <Page />
                    </Layout>
                } />
                <Route path="/home" element={
                    <Layout>
                        <Home />
                    </Layout>
                } />

                <Route path="/about-us" element={
                    <Layout>
                        <AboutUs />
                    </Layout>
                } />
                <Route path="/vision-&-mission" element={<Navigate to='/VisionAndMission' />} />
                <Route path="/VisionAndMission" element={
                    <Layout>
                        <VisionMission />
                    </Layout>
                } />
                <Route path="/partner-org" element={
                    <Layout>
                        <PartnerOrg />
                    </Layout>
                } />
                <Route path="/management-team" element={
                    <Layout>
                        <ManagementTeam />
                    </Layout>
                } />
                <Route path="/abm-team" element={<Navigate to='/brm-team' />} />
                <Route path="/brm-team" element={
                    <Layout>
                        <BRMTeam />
                    </Layout>
                } />
                <Route path="/projects" element={
                    <Layout>
                        <Projects />
                    </Layout>
                } />
                <Route path="/events" element={
                    <Layout>
                        <Events />
                    </Layout>
                } />
                <Route path="/search" element={
                    <Layout>
                        <Search />
                    </Layout>
                } />
                <Route path="/update-password" element={
                    <Layout>
                        <UpdatePassword />
                    </Layout>
                } />
                {/* <Route path="/gallery" element={<Navigate to='/project-activity-pictures' />} /> */}
                <Route path="/project-activity-pictures" element={
                    <Layout>
                        <ProjectActivityPictures />
                    </Layout>
                } />
                <Route path="/gallery" element={
                    <Layout>
                        <Gallery />
                    </Layout>
                } />
                <Route path="/videos" element={
                    <Layout>
                        <Videos />
                    </Layout>
                } />
                <Route path="/announcement" element={<Navigate to='/news' />} />
                <Route path="/news" element={
                    <Layout>
                        <News />
                    </Layout>
                } />
                <Route path="/career" element={
                    <Layout>
                        <Career />
                    </Layout>
                } />
                <Route path="/tenders" element={
                    <Layout>
                        <Tenders />
                    </Layout>
                } />
                <Route path="/archives" element={
                    <Layout>
                        <Archives />
                    </Layout>
                } />
                
                <Route path="/login" element={<Login />} />
                {/* <Route path="/welcome-to-abm" element={
                    <AdminLayout>
                    <AdminLandingPage/>
                    </AdminLayout>
                    } /> */}
                <Route path="/add-user" element={
                    <AdminLayout>
                        <AddUser />
                    </AdminLayout>
                } />
                <Route path="/update-about" element={
                    <AdminLayout>
                        <UpdateAbout />
                    </AdminLayout>
                } />
                <Route path="/users" element={
                    <AdminLayout>
                        <Users />
                    </AdminLayout>
                } />
                <Route path="/create-blogs" element={
                    <AdminLayout>
                        <CreateBlogs />
                    </AdminLayout>
                } />
                <Route path="/all-blogs" element={
                    <AdminLayout>
                        <AllBlogs />
                    </AdminLayout>
                } />
                <Route path="/all-careers" element={
                    <AdminLayout>
                        <AllCareer />
                    </AdminLayout>
                } />
                <Route path="/add-career" element={
                    <AdminLayout>
                        <AddCareer />
                    </AdminLayout>
                } />
                <Route path="/all-applications" element={
                    <AdminLayout>
                        <AllApplications />
                    </AdminLayout>
                } />
                <Route path="/add-slider-image" element={
                    <AdminLayout>
                        <AddSliderImage />
                    </AdminLayout>
                } />
                <Route path="/all-slider-image" element={
                    <AdminLayout>
                        <AllSliderImages />
                    </AdminLayout>
                } />
                <Route path="/create-event" element={
                    <AdminLayout>
                        <CreateEvent />
                    </AdminLayout>
                } />
                <Route path="/all-events" element={
                    <AdminLayout>
                        <AllEvents />
                    </AdminLayout>
                } />
                <Route path="/add-media" element={
                    <AdminLayout>
                        <AddPicture />
                    </AdminLayout>
                } />
                <Route path="/all-media" element={
                    <AdminLayout>
                        <AllPictures />
                    </AdminLayout>
                } />
                <Route path="/add-video" element={
                    <AdminLayout>
                        <AddVideos />
                    </AdminLayout>
                } />
                <Route path="/all-videos" element={
                    <AdminLayout>
                        <AllVideos />
                    </AdminLayout>
                } />
                <Route path="/add-news" element={
                    <AdminLayout>
                        <AddNews />
                    </AdminLayout>
                } />
                <Route path="/all-news" element={
                    <AdminLayout>
                        <AllNews />
                    </AdminLayout>
                } />
                <Route path="/add-partner" element={
                    <AdminLayout>
                        <AddPartner />
                    </AdminLayout>
                } />
                <Route path="/all-partners" element={
                    <AdminLayout>
                        <AllPartners />
                    </AdminLayout>
                } />
                <Route path="/add-project" element={
                    <AdminLayout>
                        <AddProject />
                    </AdminLayout>
                } />
                <Route path="/all-projects" element={
                    <AdminLayout>
                        <AllProjects />
                    </AdminLayout>
                } />
                <Route path="/add-member" element={
                    <AdminLayout>
                        <AddMember />
                    </AdminLayout>
                } />
                <Route path="/all-members" element={
                    <AdminLayout>
                        <AllMembers />
                    </AdminLayout>
                } />
                <Route path="/contact-us" element={
                    <Layout>
                        <ContactUs />
                    </Layout>
                } />
                <Route path="/message-from-executive-director" element={
                    <Layout>
                        <MessageFromExecDir />
                    </Layout>
                } />

                <Route path="/create-tender" element={
                    <AdminLayout>
                        <CreateTender />
                    </AdminLayout>
                } />
                <Route path="/all-tenders" element={
                    <AdminLayout>
                        <AllTenders />
                    </AdminLayout>
                } />
                <Route path="/update-contact-us" element={
                    <AdminLayout>
                        <UpdateContactUs />
                    </AdminLayout>
                } />
                <Route path='/update-site-info' element={
                    <AdminLayout>
                        <UpdateSiteInfo />
                    </AdminLayout>
                } />
                <Route path="/footer-management" element={
                    <AdminLayout>
                        <FooterManagement />
                    </AdminLayout>
                } />
               
                <Route path='/create-bodycard' element={
                    <AdminLayout>
                        <AddBodyCard/>
                    </AdminLayout>
                } />
                <Route path='/help-option' element={
                    <AdminLayout>
                        <HelpOptions/>
                    </AdminLayout>
                } />
                <Route path='/categories' element={
                    <AdminLayout>
                        <Categories/>
                    </AdminLayout>
                } />
                <Route path='/stats' element={
                    <AdminLayout>
                        <StatsAdminPage/>
                    </AdminLayout>
                } />
                <Route path='/director-message' element={
                    <AdminLayout>
                        <DirectorMessage/>
                    </AdminLayout>
                } />
                <Route path='/color-theme' element={
                    <AdminLayout>
                        <ManageColors/>
                    </AdminLayout>
                } />
                <Route path='/section-info' element={
                    <AdminLayout>
                        <SectionInfo/>
                    </AdminLayout>
                } />
                <Route path='/navbar-setting' element={
                    <AdminLayout>
                        <ManageNavbar/>
                    </AdminLayout>
                } />

                <Route path='/manage-pages' element={
                    <AdminLayout>
                        <ManagePages/>
                    </AdminLayout>
                } />
                
              
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
