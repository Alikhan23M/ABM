import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  Typography,
  Button,
  Input,
  Spinner
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import { useSelector } from "react-redux";
import { selectToken } from "../../../State/Reducers/tokenSlice";
import CloudinaryUpload from "../../../../Utilities/Cloudinary";
import { FaTimes } from "react-icons/fa";

const BodyCardsPage = () => {
  const [bodyCards, setBodyCards] = useState([]);
  const [card, setCard] = useState({
    title: "",
    description: "",
    image: "",
    url: ""
  });
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const storedToken = localStorage.getItem("token");
  const token = useSelector(selectToken) || storedToken;

  // Fetch Body Cards
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await AxiosRequest.get("/api/bodycards");
      setBodyCards(response.data);
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingCard) {
      setEditingCard({ ...editingCard, [name]: value });
    } else {
      setCard({ ...card, [name]: value });
    }
  };

  const handleImageUploadSuccess = (url) => {
    if (editingCard) {
      setEditingCard({ ...editingCard, image: url });
    } else {
      setCard({ ...card, image: url });
    }
  };

  // Add Body Card
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AxiosRequest.post("/api/bodycards", card, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Body card added successfully!");
      setCard({ title: "", description: "", image: "", url: "" });
      fetchCards();
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
    setLoading(false);
  };

  // Update Body Card
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await AxiosRequest.put(`/api/bodycards/${editingCard._id}`, editingCard, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Body card updated successfully!");
      setEditingCard(null);
      fetchCards();
    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
  };

  // Delete Body Card
  const handleDelete = async (id) => {
    try {
      const response = await AxiosRequest.delete(`/api/bodycards/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status == 200) {
        toast.success("Body card deleted successfully!");
        setBodyCards(bodyCards.filter((c) => c._id !== id));
      }
      else {
        toast.error("failed")
      }

    } catch (err) {
      toast.error(err.response ? err.response.data.message : "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Toaster />

      {/* Form */}
      <Card className="mx-auto w-full max-w-md rounded-xl p-6 bg-white shadow-md mb-8">
        <Typography variant="h4" className="mb-4 text-blue-gray-900">
          {editingCard ? "Edit Body Card" : "Add Body Card"}
        </Typography>
        <form
          onSubmit={editingCard ? handleEditSubmit : handleSubmit}
          className="flex flex-col gap-4"
        >
          <Input
            label="Title"
            name="title"
            value={editingCard ? editingCard.title : card.title}
            onChange={handleChange}
            required
            color="black"
          />
          <Input
            label="Description"
            name="description"
            value={editingCard ? editingCard.description : card.description}
            onChange={handleChange}
            color="black"
          />
          <Input
            label="URL"
            name="url"
            value={editingCard ? editingCard.url : card.url}
            onChange={handleChange}
            required
            color="black"
          />
          <div className="border rounded-lg p-2 border-black">
            <CloudinaryUpload
              onUploadSuccess={handleImageUploadSuccess}
              folder="BodyCards"
            />

          </div>
          {editingCard && editingCard.image && (
           <div className="relative">
             <img
              src={editingCard.image}
              alt="Uploaded"
              className="mt-2 w-full h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setEditingCard({ ...editingCard, image: '' });
              }}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
            >
              <FaTimes size={12} />
            </button>
           </div>
          )}
          {card.image && (
            <div className="relative">
              <img
                src={card.image}
                alt="Uploaded"
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {
                  setCard({ ...card, image: '' });
                }}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
              >
                <FaTimes size={12} />
              </button>
            </div>

          )}
          <Button
            type="submit"
            className="w-full bg-black shadow-none hover:shadow-md hover:shadow-gray-800"
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : editingCard
                ? "Update Body Card"
                : "Add Body Card"}
          </Button>
          {editingCard && (
            <Button
              type="button"
              className="w-full bg-gray-500 mt-2"
              onClick={() => setEditingCard(null)}
            >
              Cancel Edit
            </Button>
          )}
        </form>
      </Card>

      {/* Body Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bodyCards.map((card) => (
          <motion.div
            key={card._id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-4 shadow-lg rounded-lg bg-white flex flex-col h-full">
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="mb-4 w-full h-48 object-cover rounded-lg"
                />
              )}
              <Typography
                variant="h5"
                className="mb-2 text-black font-semibold"
              >
                {card.title}
              </Typography>
              <Typography className="mb-2 text-gray-700 text-sm">
                {card.description}
              </Typography>
              {card.url && (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mb-4"
                >
                  {card.url}
                </a>
              )}
              <Button
                className="mt-auto w-full bg-black"
                onClick={() => setEditingCard(card)}
              >
                Edit
              </Button>
              <Button
                className="w-full bg-red-500 mt-2"
                onClick={() => handleDelete(card._id)}
              >
                Delete
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BodyCardsPage;
