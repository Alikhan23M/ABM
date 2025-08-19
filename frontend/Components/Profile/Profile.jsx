import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setRoleAction } from "../State/Reducers/roleSlice";
import { selectToken, setTokenAction } from "../State/Reducers/tokenSlice";
import AxiosRequest from "../AxiosRequest/AxiosRequest";
import { selectUserId, setUserIdAction } from "../State/Reducers/userIdSlice";

const profileMenuItems = [
  {
    label: "Update Password",
    icon: Cog6ToothIcon,
  },
  {
    label: "Log Out",
    icon: PowerIcon,
  },
];

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [picUrl, setPicUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
const storedToken = localStorage.getItem('token');
const token = useSelector(selectToken)||storedToken;
const storedUserId = localStorage.getItem('userId');
const userId = useSelector(selectUserId) || storedUserId;

  useEffect(() => {
    const fetchPicUrl = async () => {
      try {
        const response = await AxiosRequest.get(`/api/user/getPic`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        });
        setPicUrl(response.data.picUrl || "https://docs.material-tailwind.com/img/face-2.jpg");
      } catch (error) {
        setPicUrl("https://docs.material-tailwind.com/img/face-2.jpg"); // Use dummy image on error
      } finally {
        setLoading(false);
      }
    };

    fetchPicUrl();
  }, [token]);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        AxiosRequest.post('/api/user/logout', {    
          userId
        }
      )
        dispatch(setRoleAction(null));
        dispatch(setTokenAction(null));
        dispatch(setUserIdAction(null));
        navigate('/home');
      }
    });
  };

  const handleMenuClick = (label) => {
    closeMenu();
    if (label === "Update Password") {
      navigate('/update-password');
    } else if (label === "Log Out") {
      handleLogout();
    }
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          {loading ? (
            <Spinner className="h-8 w-8" />
          ) : (
            <Avatar
              variant="circular"
              size="md"
              alt="Profile Picture"
              withBorder={true}
              color="blue-gray"
              className="p-0.5"
              src={picUrl}
            />
          )}
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default Profile;

