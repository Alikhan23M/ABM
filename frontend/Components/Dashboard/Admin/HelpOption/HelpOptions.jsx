import React, { useState, useEffect } from "react";

import { toast } from "react-toastify";

// Import icons
import { FaRocket,
  FaUsers,
  FaChartLine,
  FaDatabase,
  FaLink,
  FaCalendarAlt,
  FaTasks,
  FaNewspaper,
  FaBriefcase,
  FaCogs,
  FaSmile,
  FaCheck,
  FaCheckDouble,
  FaShieldAlt,
  FaStar,
  FaHandHolding,
  FaGrinHearts,
  FaHandsHelping,
  FaHeart,
  FaGlobe,
  FaLightbulb,

 } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdVolunteerActivism } from "react-icons/md";
import { GiGiftOfKnowledge } from "react-icons/gi";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { Toaster } from "react-hot-toast";

const iconOptions = {
  FaRocket: <FaRocket className="text-2xl text-yellow-700" />,
  IoPersonSharp: <IoPersonSharp className="text-2xl text-yellow-700" />,
  FaHandsHelping: <FaHandsHelping className="text-2xl text-yellow-700" />,
  FaHeart: <FaHeart className="text-2xl text-yellow-700" />,
  FaGlobe: <FaGlobe className="text-2xl text-yellow-700" />,
  FaUsers: <FaUsers className="text-2xl text-yellow-700" />,
  FaLightbulb: <FaLightbulb className="text-2xl text-yellow-700" />,
  MdVolunteerActivism: <MdVolunteerActivism className="text-2xl text-yellow-700" />,
  GiGiftOfKnowledge: <GiGiftOfKnowledge className="text-2xl text-yellow-700" />,
  FaChartLine:<FaChartLine className="text-2xl text-yellow-700"/>,
  FaDatabase:<FaDatabase className="text-2xl text-yellow-700"/>,
  FaLink:<FaLink className="text-2xl text-yellow-700"/>,
  FaCalendarAlt:<FaCalendarAlt className="text-2xl text-yellow-700"/>,
  FaTasks:<FaTasks className="text-2xl text-yellow-700"/>,
  FaNewspaper:<FaNewspaper className="text-2xl text-yellow-700"/>,
  FaBriefcase:<FaBriefcase className="text-2xl text-yellow-700"/>,
  FaCogs:<FaCogs className="text-2xl text-yellow-700"/>,
  FaSmile:<FaSmile className="text-2xl text-yellow-700"/>,
  FaCheck:<FaCheck className="text-2xl text-yellow-700"/>,
  FaCheckDouble:<FaCheckDouble className="text-2xl text-yellow-700"/>,
  FaShieldAlt:<FaShieldAlt className="text-2xl text-yellow-700"/>,
  FaStar:<FaStar className="text-2xl text-yellow-700"/>,
  FaHandHolding:<FaHandHolding className="text-2xl text-yellow-700"/>,
  FaGrinHearts:<FaGrinHearts className="text-2xl text-yellow-700"/>,

};

export default function HelpOptionsAdminPage() {
  const [helpOptions, setHelpOptions] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    icon: "FaRocket"
  });
  const [editId, setEditId] = useState(null);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const token = localStorage.getItem("token");

  const fetchOptions = async () => {
    try {
      const res = await AxiosRequest.get("/api/help-options/getHelpOptions");
      setHelpOptions(res.data);
    } catch {
      toast.error("Failed to load help options");
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await AxiosRequest.patch(`/api/help-options/updateHelpOption/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Help option updated!");
      } else {
        await AxiosRequest.post(`/api/help-options/createHelpOption`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Help option created!");
      }
      setFormData({
        title: "",
        description: "",
        buttonText: "",
        buttonLink: "",
        icon: "FaRocket"
      });
      setEditId(null);
      fetchOptions();
    } catch {
      toast.error("Error saving help option");
    }
  };

  const handleDelete = async (id) => {
    try {
      await AxiosRequest.delete(`/api/help-options/deleteHelpOption/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Deleted successfully!");
      setHelpOptions(helpOptions.filter(opt => opt._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  const handleEdit = (option) => {
    setFormData(option);
    setEditId(option._id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">{editId ? "Edit Help Option" : "Add Help Option"}</h1>

      {/* Centered Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Button Text"
          className="border p-2 rounded"
          value={formData.buttonText}
          onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
        />
        <input
          type="text"
          placeholder="Button Link"
          className="border p-2 rounded"
          value={formData.buttonLink}
          onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
        />

        {/* Custom Icon Picker */}
        <div className="relative">
          <div
            onClick={() => setShowIconMenu(!showIconMenu)}
            className="flex items-center gap-2 bg-teal-800 text-white p-2 rounded cursor-pointer"
          >
            {iconOptions[formData.icon]}
            <span>{formData.icon}</span>
          </div>
          {showIconMenu && (
            <div className="absolute bg-white border rounded shadow-md mt-1 w-full max-h-48 overflow-y-auto z-10">
              {Object.keys(iconOptions).map((key) => (
                <div
                  key={key}
                  className="flex items-center gap-2 p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setFormData({ ...formData, icon: key });
                    setShowIconMenu(false);
                  }}
                >
                  {iconOptions[key]}
                  <span>{key}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button type="submit" className="bg-teal-800 text-white p-2 rounded hover:bg-teal-900">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Display List */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        {helpOptions.map((opt) => (
          <div key={opt._id} className="p-4 border rounded shadow flex flex-col gap-2">
            <div>{iconOptions[opt.icon]}</div>
            <h2 className="font-bold">{opt.title}</h2>
            <p>{opt.description}</p>
            <a href={opt.buttonLink} className="text-blue-600 underline">{opt.buttonText}</a>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(opt)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(opt._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
