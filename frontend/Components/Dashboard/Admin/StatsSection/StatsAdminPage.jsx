import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";

// Import icons
import {
  FaRocket,
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
} from "react-icons/fa";
import { Toaster } from "react-hot-toast";

// Extended icon set
const iconOptions = {
  FaRocket: <FaRocket className="text-2xl text-yellow-700" />,
  FaUsers: <FaUsers className="text-2xl text-yellow-700" />,
  FaChartLine: <FaChartLine className="text-2xl text-yellow-700" />,
  FaDatabase: <FaDatabase className="text-2xl text-yellow-700" />,
  FaLink: <FaLink className="text-2xl text-yellow-700" />,
  FaCalendarAlt: <FaCalendarAlt className="text-2xl text-yellow-700" />, // Events
  FaTasks: <FaTasks className="text-2xl text-yellow-700" />, // Tasks
  FaNewspaper: <FaNewspaper className="text-2xl text-yellow-700" />, // News
  FaBriefcase: <FaBriefcase className="text-2xl text-yellow-700" />, // Projects
  FaCogs: <FaCogs className="text-2xl text-yellow-700" />, // Settings / Config
  FaSmile: <FaSmile className="text-2xl text-yellow-700" />, // Smile
  FaCheck: <FaCheck className="text-2xl text-yellow-700" />, // Check
  FaCheckDouble: <FaCheckDouble className="text-2xl text-yellow-700" />, // Check Double
  FaShieldAlt: <FaShieldAlt className="text-2xl text-yellow-700" />, // Shield
  FaStar: <FaStar className="text-2xl text-yellow-700" />, // Star
  FaHandHolding: <FaHandHolding className="text-2xl text-yellow-700" />, // Hand Holding
  FaGrinHearts: <FaGrinHearts className="text-2xl text-yellow-700" />, // Grin Hearts
};

export default function StatsAdminPage() {
  const [stats, setStats] = useState([]);
  const [availableCollections, setAvailableCollections] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    icon: "FaRocket",
    sourceType: "collection",
    collectionName: "",
    targetValue: "",
    redirectLink: "",
  });
  const [editId, setEditId] = useState(null);
  const [showIconMenu, setShowIconMenu] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all stats
  const fetchStats = async () => {
    try {
      const res = await AxiosRequest.get("/api/stats");
      setStats(res.data);
    } catch {
      toast.error("Failed to load stats");
    }
  };

  // Fetch available collections from backend
  const fetchCollections = async () => {
    try {
      const res = await AxiosRequest.get("/api/stats/available-collections");
      setAvailableCollections(res.data);
    } catch {
      toast.error("Failed to load available collections");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCollections();
  }, []);

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await AxiosRequest.put(`/api/stats/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Stat updated!");
      } else {
        await AxiosRequest.post(`/api/stats/createStat`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Stat created!");
      }
      resetForm();
      fetchStats();
    } catch {
      toast.error("Error saving stat");
    }
  };

  // Delete stat
  const handleDelete = async (id) => {
    try {
      await AxiosRequest.delete(`/api/stats/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Deleted successfully!");
      setStats((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };

  // Edit stat
  const handleEdit = (stat) => {
    setFormData({
      title: stat.title,
      icon: stat.icon,
      sourceType: stat.sourceType,
      collectionName: stat.collectionName || "",
      targetValue: stat.targetValue || "",
      redirectLink: stat.redirectLink || "",
    });
    setEditId(stat._id);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      icon: "FaRocket",
      sourceType: "collection",
      collectionName: "",
      targetValue: "",
      redirectLink: "",
    });
    setEditId(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6">
        {editId ? "Edit Stat" : "Add Stat"}
      </h1>

      {/* Form */}
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

        {/* Source Type */}
        <select
          className="border p-2 rounded"
          value={formData.sourceType}
          onChange={(e) =>
            setFormData({ ...formData, sourceType: e.target.value })
          }
        >
          <option value="collection">Collection</option>
          <option value="custom">Custom</option>
        </select>

        {/* Conditional Fields */}
        {formData.sourceType === "collection" && (
          <select
            className="border p-2 rounded"
            value={formData.collectionName}
            onChange={(e) =>
              setFormData({ ...formData, collectionName: e.target.value })
            }
          >
            <option value="">Select Collection</option>
            {availableCollections.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        )}
        {formData.sourceType === "custom" && (
          <input
            type="number"
            placeholder="Target Value"
            className="border p-2 rounded"
            value={formData.targetValue}
            onChange={(e) =>
              setFormData({ ...formData, targetValue: e.target.value })
            }
          />
        )}

        <input
          type="text"
          placeholder="Redirect Link"
          className="border p-2 rounded"
          value={formData.redirectLink}
          onChange={(e) =>
            setFormData({ ...formData, redirectLink: e.target.value })
          }
        />

        {/* Icon Picker */}
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

        <button
          type="submit"
          className="bg-teal-800 text-white p-2 rounded hover:bg-teal-900"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* Stats List */}
     {/* Stats List */}
<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
  {stats.map((stat) => {
    // Determine the value to display (same as user side)
    const displayValue = stat.computedValue ?? stat.targetValue ?? 0;

    return (
      <div
        key={stat._id}
        className="p-4 border rounded shadow flex flex-col gap-2"
      >
        <div>{iconOptions[stat.icon]}</div>
        <h2 className="font-bold">{stat.title}</h2>
        <p>Source: {stat.sourceType}</p>
        {stat.sourceType === "collection" && (
          <p>Collection: {stat.collectionName}</p>
        )}
        {stat.sourceType === "custom" && <p>Target: {stat.targetValue}</p>}

        {/* Display logic adjusted */}
        <p>Value: {displayValue}</p>

        {stat.redirectLink && (
          <a
            href={stat.redirectLink}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redirect
          </a>
        )}
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleEdit(stat)}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(stat._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    );
  })}
</div>

    </div>
  );
}
