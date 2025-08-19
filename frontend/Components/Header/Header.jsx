// import React, { useState, useEffect, Fragment } from "react";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Input,
//   IconButton,
//   Collapse,
// } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   ChevronDownIcon,
//   ChevronRightIcon,
//   Square3Stack3DIcon,
//   Bars2Icon,
//   XMarkIcon,
//   Bars3Icon,
//   MagnifyingGlassIcon,
//   ArrowRightCircleIcon,
//   ArrowRightIcon,
//   ArrowRightEndOnRectangleIcon
// } from "@heroicons/react/24/solid";
// import logo from '../../assets/ABM.png';
// import { useDispatch, useSelector } from "react-redux";
// import { selectRole, setRoleAction } from "../State/Reducers/roleSlice";
// import { setTokenAction } from "../State/Reducers/tokenSlice";
// import Profile from "../Profile/Profile";
// import { BsArrowRight } from "react-icons/bs";
// import AxiosRequest from "../AxiosRequest/AxiosRequest";


// // nav list menu items
// const navListMenuItems = {
//   aboutUs: [
//     {
//       title: "Vision & Mission",
//     },
//     {
//       title: "Partner Org",
//     },
//   ],
//   abmTeam: [
//     {
//       title: "Management Team",
//     },
//     {
//       title: "BRM Team",
//     },
//   ],
//   gallery: [
//     {
//       title: "Project Activity Pictures",
//     },
//     {
//       title: "Videos",
//     },
//   ],
//   announcement: [
//     {
//       title: "News",
//     },
//     {
//       title: "Career",
//     },
//     {
//       title: "Tenders",
//     },
//   ],
// };


// const NavListMenu = ({ menuItems, label }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
 

//   const renderItems = menuItems.map(({ title }) => (
//     <a href={`/${title.replace(/\s+/g, '-').toLowerCase()}`} key={title}>
//       <MenuItem>
//         <Typography variant="small" className=" text-teal-800 font-semibold hover:text-yellow-700">
//           {title}
//         </Typography>
//       </MenuItem>
//     </a>
//   ));

//   return (
//     <Fragment>
//       <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
//         <MenuHandler>
//           <div className="lg:grid hidden flex-row lg:grid-cols-[auto,auto] space-x-2 p-[1vw] items-center rounded-xl cursor-pointer">
//             <a href={`/${label.replace(/\s+/g, '-').toLowerCase()}`}>
//               <Typography variant="small" className="text-teal-800 hover:text-yellow-700 font-semibold">
//                 {label}
//               </Typography>
//             </a>
//             <div>
//               <ChevronDownIcon
//                 strokeWidth={3}
//                 className={`h-3 w-3 text-yellow-700  transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
//               />
//             </div>
//           </div>
//         </MenuHandler>
//         <MenuList className={`w-[10rem] lg:grid-cols-1 gap-3 lg:grid !bg-transparent !p-[0vh] text-black ${isMenuOpen ? '' : 'hidden'}`}>
//           <ul className="flex w-full opacity-90 bg-white !p-[0vh] flex-col gap-1">
//             {renderItems}
//           </ul>
//         </MenuList>
//       </Menu>
//       <MenuItem className="flex items-center p-[1vw] gap-2 font-medium text-white lg:hidden">
//         <a href={`/${label.replace(/\s+/g, '-').toLowerCase()}`}>
//           <Typography variant="small" className="text-black font-semibold">
//             {label}
//           </Typography>
//         </a>
//       </MenuItem>
//       <ul className="ml-6 text- flex w-full flex-col gap-1 lg:hidden">
//         {renderItems}
//       </ul>
//     </Fragment>
//   );
// };

// const navListItems = [
//   {
//     label: "About Us",
//     menuItems: navListMenuItems.aboutUs,
//   },
//   {
//     label: "ABM Team",
//     menuItems: navListMenuItems.abmTeam,
//   },
//   {
//     label: "Projects",
//   },
//   {
//     label: "Events",
//   },
//   {
//     label: "Gallery",
//     menuItems: navListMenuItems.gallery,
//   },
//   {
//     label: "Announcement",
//     menuItems: navListMenuItems.announcement,
//   },
//   {
//     label: "Contact Us",
//   },
//   {
//     label: "Archives",
//   },

// ];

// const NavList = () => {
 
//   return (
//     <ul className="mt-2 mb-4 flex  flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center  ">
//       {navListItems.map(({ label, menuItems }) => (
//         <Fragment key={label}>
//           {menuItems ? (
//             <NavListMenu menuItems={menuItems} label={label} />
//           ) : (
//             <a href={`/${label.replace(/\s+/g, '-').toLowerCase()}`}>
//               <Typography
//                 variant="small"
//               >
//                 <MenuItem className="lg:grid flex lg:grid-cols-[auto,auto] space-x-2 p-[1vw] items-center cursor-pointer" >
//                   <span className="text-teal-800 hover:text-yellow-700 font-bold">{label}</span>
//                 </MenuItem>
//               </Typography>
//             </a>
//           )}
//         </Fragment>
//       ))}
//     </ul>
//   );
// };


// const Header = () => {
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();
//   const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
//   const storedRole = localStorage.getItem('role');
//   const role = useSelector(selectRole) || storedRole;
//   const dispatch = useDispatch();
//   const isLoggedIn = role !== 'null';
//   const isAdmin = role === 'admin';
//   const isUser = role === 'user';
//   console.log('isLoggedIn', isLoggedIn);
//   const[siteLogo,setsiteLogo] = useState(null);
// useEffect(() => {
//   const logoData = async () => {
//     try {
//       const response =await AxiosRequest.get('/api/siteinfo');
//       console.log("sitelogourl is ", response.data.logo);
//       setsiteLogo(response.data.logo);
      
//     } catch (error) {
//       setsiteLogo(null);
//     }
//   }
//   logoData();
  
// },[])
//   useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 1190 && setIsNavOpen(false)
//     );
//   }, []);

//   const handleLogin = () => {
//     navigate('/login');
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     navigate(`/search?q=${searchQuery}`);
//   };

//   const handleAdminPanel = () => {
//     navigate('/users');
//   };

//   return (
//     <Navbar className="min-w-screen bg-white max-w-screen-4xl p-2 rounded-sm lg:pl-6">
//       <div className="relative mx-auto flex items-center justify-between ">
//         <a href="/home">
//           { siteLogo ? (<img src={siteLogo} className="h-[8vh] w-full object-cover" alt="logo" />):<img src={logo} className="h-[8vh] w-full object-cover" alt="logo" />}
//         </a>
//         <div className="hidden lg:block">
//           <NavList />
//         </div>
//         <IconButton
//           size="sm"
//           color="white"
//           variant="text"
//           onClick={toggleIsNavOpen}
//           className="ml-auto mr-2 lg:hidden text-black"
//         >
//           {isNavOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
//         </IconButton>
//         <form onSubmit={handleSearch} className="relative hidden lg:flex w-full gap-2 md:w-max">
//           <Input
//             type="search"
//             color="black"
//             label="Search..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="focus:!ring-0 search-input"
//             containerProps={{ className: "min-w-[288px]" }}
//           />
//         </form>
//         {(isUser && !isAdmin) && (
//           <Profile />
//         )}
//         {(!isLoggedIn && !isAdmin) && (
//           <Button size="sm" className="!bg-white text-black shadow-none hover:shadow-lg hover:shadow-black" variant="text" onClick={handleLogin}>
//             <span>Log In</span>
//           </Button>
//         )
//         }
//         {!isUser && isLoggedIn && (
//           <Button size="sm" className="!bg-teal-800 text-white shadow-none hover:shadow-lg hover:shadow-black" variant="text" onClick={handleAdminPanel}>
//             <span>Admin</span>
//           </Button>
//         )}
//       </div>
//       <Collapse open={isNavOpen} className="">
//         <div className="relative mt-[2vh] items-center flex flex-col w-full gap-2 md:w-max lg:hidden pb-4">
//           <div className="relative w-full md:w-[80vw]">
//             <Input
//               type="search"
//               color="black"
//               label="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="focus:!ring-0 pl-10"
//             />
//             <IconButton
//               type="submit"
//               size="sm"
//               disabled={!searchQuery}
//               onClick={handleSearch}
//               className={`!absolute top-1 right-3 bg-black rounded-3xl`}
//             >
//               <ArrowRightIcon className="h-5 w-5 text-white" />
//             </IconButton>
//           </div>
//         </div>
//         <div className="overflow-y-auto lg:hidden h-64">
//           <NavList />
//         </div>
//       </Collapse>
//     </Navbar>
//   );
// }


import {
  Navbar,
  Typography,
  Button,
  Input,
  IconButton,
  Collapse,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useState,useEffect, Fragment } from "react";
import {
  ChevronDownIcon,
  XMarkIcon,
  Bars3Icon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/ABM.png";
import { useSelector } from "react-redux";
import { selectRole } from "../State/Reducers/roleSlice";
import Profile from "../Profile/Profile";
import AxiosRequest from "../AxiosRequest/AxiosRequest";

// Dropdown menu component
// Dropdown menu component
const NavListMenu = ({
  link,
  navLinkColor,
  navLinkHover,
  dropdownBg,
  dropdownText,
  dropdownHoverBg,
  dropdownHoverText,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mainHref = link.url || `/${(link.label || "").replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
      <MenuHandler>
        <div className="lg:flex hidden items-center space-x-1 p-[1vw] cursor-pointer">
          <a href={mainHref}>
            <Typography
              variant="small"
              className="font-semibold"
              style={{ color: isMenuOpen ? navLinkHover : navLinkColor }}
            >
              {link.label}
            </Typography>
          </a>
          <ChevronDownIcon
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
            style={{ color: isMenuOpen ? navLinkHover : navLinkColor }}
          />
        </div>
      </MenuHandler>

      <MenuList
        className="p-1 rounded-md shadow-lg border-none"
        style={{ backgroundColor: dropdownBg }}
      >
        {link.dropdownItems.map((d, j) => (
          <a href={d.url} key={d._id || j}>
           <MenuItem
              className="text-sm border-none outline-none ring-0 focus:outline-none active:outline-none shadow-none hover:shadow-none"
              style={{
                color: dropdownText,
                backgroundColor: dropdownBg,
                border: "none",
                boxShadow: "none",
                outline: "none",
                ring: "0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = dropdownHoverBg;
                e.currentTarget.style.color = dropdownHoverText;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.outline = "none";
                e.currentTarget.style.ring = "0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = dropdownBg;
                e.currentTarget.style.color = dropdownText;
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.outline = "none";
                e.currentTarget.style.ring = "0";
              }}
            >
              <Typography variant="small" className="font-medium">
                {d.label}
              </Typography>
            </MenuItem>
          </a>
        ))}
      </MenuList>
   </Menu>
  );
};
// Header component
const Header = () => {

  const defaultNavbar = {
  links: [
    {
      label: "About Us",
      url: "/about-us",
      type: "dropdown",
      order: 0,
      isVisible: true,
      dropdownItems: [
        { label: "Vision & Mission", url: "/vision-&-mission", order: 0, isVisible: true },
        { label: "Partner Org", url: "/partner-org", order: 1, isVisible: true },
      ],
    },
    {
      label: "ABM Team",
      url: "brm-team",
      type: "dropdown",
      order: 1,
      isVisible: true,
      dropdownItems: [
        { label: "Management Team", url: "/management-team", order: 0, isVisible: true },
        { label: "BRM Team", url: "/brm-team", order: 1, isVisible: true },
      ],
    },
    { label: "Projects", url: "/projects", type: "direct", order: 2, isVisible: true, dropdownItems: [] },
    { label: "Events", url: "/events", type: "direct", order: 3, isVisible: true, dropdownItems: [] },
    {
      label: "Gallery",
      url: "/gallery",
      type: "dropdown",
      order: 4,
      isVisible: true,
      dropdownItems: [
        { label: "Project Activity Pictures", url: "/project-activity-pictures", order: 0, isVisible: true },
        { label: "Videos", url: "/videos", order: 1, isVisible: true },
      ],
    },
    {
      label: "Announcement",
      url: "#",
      type: "dropdown",
      order: 5,
      isVisible: true,
      dropdownItems: [
        { label: "News", url: "/news", order: 0, isVisible: true },
        { label: "Career", url: "/career", order: 1, isVisible: true },
        { label: "Tenders", url: "/tenders", order: 2, isVisible: true },
      ],
    },
    { label: "Contact Us", url: "/contact-us", type: "direct", order: 6, isVisible: true, dropdownItems: [] },
    { label: "Archives", url: "/archives", type: "direct", order: 7, isVisible: true, dropdownItems: [] },
  ],
  styling: {
    navbar: { backgroundColor: "#ffffff", textColor: "#0f766e" },
    links: { color: "#0f766e", hoverColor: "#f59e0b", activeColor: "#2563eb", fontWeight: "font-medium" },
    dropdown: { backgroundColor: "#ffffff", textColor: "#000000", hoverBackgroundColor: "#f3f4f6", hoverTextColor: "#0f766e" },
    input: { backgroundColor: "#ffffff", borderColor: "#0f766e", textColor: "#000000", placeholderColor: "#9ca3af" },
    button: { backgroundColor: "#0f766e", textColor: "#ffffff", hoverBackgroundColor: "#1d4ed8", hoverTextColor: "#f3f4f6" },
  },
  isActive: true,
};
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [siteLogo, setSiteLogo] = useState(null);
  const [navbarConfig, setNavbarConfig] = useState(defaultNavbar);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const storedRole = localStorage.getItem("role");
  const role = useSelector(selectRole) || storedRole;
  const isLoggedIn = role !== "null";
  const isAdmin = role === "admin";
  const isUser = role === "user";

  // Helper for dynamic theme values
  const s = (path, fallback) => {
    try {
      const parts = path.split(".");
      let cur = navbarConfig;
      for (const p of parts) {
        if (!cur) return fallback;
        cur = cur[p];
      }
      return cur === undefined || cur === null ? fallback : cur;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const fetchConfig = async () => {
      setLoading(true);
      try {
        const res = await AxiosRequest.get("/api/navbar");
        setNavbarConfig(res?.data || null);
      } catch (err) {
        console.error("Failed to fetch navbar config", err);
        setNavbarConfig(defaultNavbar);
      } finally {
        setLoading(false);
      }
    };

    const fetchLogo = async () => {
      try {
        const res = await AxiosRequest.get("/api/siteinfo");
        setSiteLogo(res?.data?.logo || null);
      } catch {
        setSiteLogo(null);
      }
    };

    fetchConfig();
    fetchLogo();
  }, []);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const NavList = () => {
    if (!navbarConfig) return null;
    const links = Array.isArray(navbarConfig.links) ? navbarConfig.links : [];

    const navLinkColor = s("styling.links.color", "#0f766e");
    const navLinkHover = s("styling.links.hoverColor", "#f59e0b");
    const dropdownBg = s("styling.dropdown.backgroundColor", "#ffffff");
    const dropdownText = s("styling.dropdown.textColor", "#000000");
    const dropdownHoverBg = s("styling.dropdown.hoverBackgroundColor", "#f3f4f6");
    const dropdownHoverText = s("styling.dropdown.hoverTextColor", "#1d4ed8");

    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {links.map((link, i) => {
          const isDropdown = link.type === "dropdown" && Array.isArray(link.dropdownItems) && link.dropdownItems.length > 0;
          const mainHref = link.url || `/${(link.label || "").replace(/\s+/g, "-").toLowerCase()}`;

          return (
            <Fragment key={link._id || i}>
              {isDropdown ? (
                <NavListMenu
                  link={link}
                  navLinkColor={navLinkColor}
                  navLinkHover={navLinkHover}
                  dropdownBg={dropdownBg}
                  dropdownText={dropdownText}
                  dropdownHoverBg={dropdownHoverBg}
                  dropdownHoverText={dropdownHoverText}
                />
              ) : (
                <li className="relative">
                  <a
                    href={mainHref}
                    className="lg:flex hidden px-3 py-2 font-bold"
                    style={{ color: navLinkColor }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = navLinkHover)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = navLinkColor)}
                  >
                    {link.label}
                  </a>
                  {/* Mobile links */}
                  <div className="lg:hidden">
                    <a
                      href={mainHref}
                      className="block px-3 py-2"
                      style={{ color: navLinkColor }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = navLinkHover)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = navLinkColor)}
                    >
                      {link.label}
                    </a>
                  </div>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    );
  };

  const navbarBg = s("styling.navbar.backgroundColor", "#ffffff");
  const navbarText = s("styling.navbar.textColor", "#0f766e");
  const inputBg = s("styling.input.backgroundColor", "#ffffff");
  const inputBorder = s("styling.input.borderColor", "#d1d5db");
  const inputText = s("styling.input.textColor", "#000000");
  const buttonBg = s("styling.button.backgroundColor", "#0f766e");
  const buttonText = s("styling.button.textColor", "#ffffff");

  if (loading) return <div className="p-4">Loading navbar...</div>;

  return (
    <Navbar
      className="min-w-screen max-w-screen-4xl p-2 rounded-sm lg:pl-6 relative z-[999]"
      style={{ background: navbarBg, color: navbarText }}
    >
      <div className="relative mx-auto flex items-center justify-between">
        <a href="/home">
          {siteLogo ? (
            <img src={siteLogo} className="h-[8vh] object-contain" alt="logo" />
          ) : (
            <img src={logo} className="h-[8vh] object-contain" alt="logo" />
          )}
        </a>

        <div className="hidden lg:block">
          <NavList />
        </div>

        <IconButton
          size="sm"
          color="white"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden text-black"
        >
          {isNavOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </IconButton>

        <form
          onSubmit={handleSearch}
          className="relative hidden lg:flex w-full gap-2 md:w-max"
        >
          <Input
            type="search"
            label="Search..."
            id="searchinput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        className="focus:!outline-none focus:!ring-0"
            containerProps={{ className: "min-w-[288px]" }}
            style={{
              background: inputBg,
              borderColor: inputBorder,
              color: inputText,
            }}
            inputProps={{
              style: {
                color: inputText,
                background: inputBg,
                caretColor: inputText,
              },
              placeholder: "Search...",
            }}
          />
        </form>

        {isUser && !isAdmin && <Profile />}

        {!isLoggedIn && !isAdmin && (
          <Button
            size="sm"
            className="!bg-white text-black shadow-none hover:shadow-lg hover:shadow-black"
            variant="text"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        )}

        {!isUser && isLoggedIn && (
          <Button
            size="sm"
            className="shadow-none"
            style={{ background: buttonBg, color: buttonText }}
            variant="text"
            onClick={() => navigate("/users")}
          >
            Admin
          </Button>
        )}
      </div>

      <Collapse open={isNavOpen}>
        <div className="relative mt-[2vh] items-center flex flex-col w-full gap-2 md:w-max lg:hidden pb-4">
          <div className="relative w-full md:w-[80vw]">
            <Input
              type="search"
              label="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="focus:!ring-0 pl-10"
              style={{ background: inputBg, borderColor: inputBorder, color: inputText }}
              inputProps={{ style: { color: inputText, background: inputBg }, placeholder: "Search..." }}
            />
            <IconButton
              type="submit"
              size="sm"
              disabled={!searchQuery}
              onClick={handleSearch}
              className="!absolute top-1 right-3 bg-black rounded-3xl"
            >
              <ArrowRightIcon className="h-5 w-5 text-white" />
            </IconButton>
          </div>
        </div>

        <div className="overflow-y-auto lg:hidden h-64">
          <NavList />
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
