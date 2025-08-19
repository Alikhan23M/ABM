import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import AxiosRequest from "../../../AxiosRequest/AxiosRequest";
import CloudinaryUpload from "../../../../Utilities/Cloudinary";
import { selectToken } from "../../../State/Reducers/tokenSlice";
import { FaPlus, FaTrash, FaTimes, FaEye } from "react-icons/fa";
import Page from "../../User/DynamicPage/Page";

// Helper for generating unique IDs for cards
const genId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const defaultColors = {
  background: { pageBgColor: "#f5f6f5", contentBgColor: "#ffffff" },
  text: { headingColor: "#0f766e", paragraphColor: "#374151" },
  button: { bgColor: "#f59e0b", textColor: "#000000", hoverBgColor: "#fbbf24" },
  card: {
    bgColor: "#ffffff",
    borderColor: "#e5e7eb",
    headingColor: "#0f766e",
    descriptionColor: "#374151",
    buttonBgColor: "#f59e0b",
    buttonTextColor: "#000000",
    buttonHoverColor: "#fbbf24",
  }
};

export default function ManagePages() {
  const token = useSelector(selectToken) || localStorage.getItem("token");
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUrl, setEditingUrl] = useState(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const [formData, setFormData] = useState({
    url: "",
    template: "simple-page",
    mainTitle: "",
    mainDescription: "",
    buttonText: "",
    buttonLink: "",
    contentPosition: "center",
    mainImage: "",
    imagePlacement: "top",
    cards: [],
    status: "published",
    seo: { title: "", description: "", keywords: "" },
    colors: defaultColors
  });

  const fetchPages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AxiosRequest.get("/api/pages", { headers: { Authorization: `Bearer ${token}` } });
      setPages(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch pages.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const setField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const setColorField = (category, key, value) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [category]: { ...prev.colors[category], [key]: value }
      }
    }));
  };

  const setCardField = (cardId, key, value) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === cardId ? { ...card, [key]: value } : card
      ),
    }));
  };

  const addCard = () => {
    setFormData(prev => ({
      ...prev,
      cards: [...prev.cards, {
        id: genId(),
        title: "",
        description: "",
        image: "",
        buttonText: "",
        buttonLink: "",
      }],
    }));
  };

  const removeCard = (cardId) => {
    setFormData(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== cardId),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSave = { ...formData, cards: formData.cards.map(({ id, ...rest }) => rest) };
      if (isEditing) {
        await AxiosRequest.put(`/api/pages/${editingUrl}`, dataToSave, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Page updated successfully.");
      } else {
        await AxiosRequest.post("/api/pages", dataToSave, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Page created successfully.");
      }
      resetForm();
      fetchPages();
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };
const handleEdit = async (page) => {
  try {
    // unwrap if response has nested "page"
    const editedPage = page.page ? { ...page.page } : { ...page };

    // Ensure cards have unique client-side IDs
    editedPage.cards = editedPage.cards?.map((card) => ({
      id: card._id || genId(), // add client-side ID
      title: card.title || "",
      description: card.description || "",
      image: card.image || "",
      buttonText: card.buttonText || "",
      buttonLink: card.buttonLink || "",
    })) || [];

    // Merge colors with defaults so no key is missing
    const mergedColors = {
      ...defaultColors,
      ...editedPage.colors,
      background: { ...defaultColors.background, ...editedPage.colors?.background },
      text: { ...defaultColors.text, ...editedPage.colors?.text },
      button: { ...defaultColors.button, ...editedPage.colors?.button },
      card: { ...defaultColors.card, ...editedPage.colors?.card },
    };

    // Safe SEO merge (your API sometimes sends keywords as array)
    const mergedSeo = {
      title: editedPage.seo?.title || "",
      description: editedPage.seo?.description || "",
      keywords: Array.isArray(editedPage.seo?.keywords)
        ? editedPage.seo.keywords.join(", ")
        : editedPage.seo?.keywords || "",
    };

    setFormData({
      url: editedPage.url || "",
      template: editedPage.template || "simple-page",
      mainTitle: editedPage.mainTitle || "",
      mainDescription: editedPage.mainDescription || "",
      buttonText: editedPage.buttonText || "",
      buttonLink: editedPage.buttonLink || "",
      contentPosition: editedPage.contentPosition || "center",
      mainImage: editedPage.mainImage || "",
      imagePlacement: editedPage.imagePlacement || "top",
      cards: editedPage.cards,
      status: editedPage.status || "published",
      seo: mergedSeo,
      colors: mergedColors,
    });

    setIsEditing(true);
    setEditingUrl(editedPage.url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    toast.error("Failed to load page for editing.");
    console.error(err);
  }
};



  const handleDelete = async (url) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await AxiosRequest.delete(`/api/pages/${url}`, { headers: { Authorization: `Bearer ${token}` } });
        toast.success("Page deleted successfully.");
        fetchPages();
      } catch (err) {
        toast.error("Failed to delete page.");
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditingUrl(null);
    setFormData({
      url: "",
      template: "simple-page",
      mainTitle: "",
      mainDescription: "",
      buttonText: "",
      buttonLink: "",
      contentPosition: "center",
      mainImage: "",
      imagePlacement: "top",
      cards: [],
      status: "published",
      seo: { title: "", description: "", keywords: "" },
      colors: defaultColors
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{isEditing ? "Edit Page" : "Create Page"}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Page Template</label>
              <select
                value={formData.template}
                onChange={(e) => setField("template", e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="simple-page">Simple Page</option>
                <option value="simple-page-with-image">Simple Page with Image</option>
                <option value="card-grid-page">Card Grid Page</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Page URL</label>
              <input
                type="text"
                value={formData.url}
                onChange={(e) => setField("url", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="e.g., about-us"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Main Title</label>
              <input
                type="text"
                value={formData.mainTitle}
                onChange={(e) => setField("mainTitle", e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Main Description</label>
              <textarea
                value={formData.mainDescription}
                onChange={(e) => setField("mainDescription", e.target.value)}
                className="w-full p-2 border rounded"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Button Text</label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => setField("buttonText", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Optional"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Button Link</label>
              <input
                type="text"
                value={formData.buttonLink}
                onChange={(e) => setField("buttonLink", e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Optional"
              />
            </div>

            {/* Conditional Fields based on Template */}
            {formData.template === "simple-page" && (
              <div className="mb-4 border-t pt-4">
                <h3 className="text-md font-semibold mb-2">Content Options</h3>
                <div className="mb-2">
                  <label className="block text-sm font-semibold mb-1">Content Position</label>
                  <select
                    value={formData.contentPosition}
                    onChange={(e) => setField("contentPosition", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="center">Center</option>
                    <option value="left">Left</option>
                  </select>
                </div>
              </div>
            )}

            {formData.template === "simple-page-with-image" && (
              <div className="mb-4 border-t pt-4">
                <h3 className="text-md font-semibold mb-2">Image Options</h3>
                <div className="mb-2">
                  <label className="block text-sm font-semibold mb-1">Image</label>
                  <CloudinaryUpload onUploadSuccess={(url) => setField("mainImage", url)} folder="Pages/Images" />
                  {formData.mainImage && (
                    <div className="relative mt-2">
                      <img src={formData.mainImage} alt="main" className="w-full h-28 object-cover rounded" />
                      <button type="button" onClick={() => setField("mainImage", "")} className="absolute right-2 top-2 bg-red-600 p-1 rounded text-white">
                        <FaTimes />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-semibold mb-1">Image Placement</label>
                  <select
                    value={formData.imagePlacement}
                    onChange={(e) => setField("imagePlacement", e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="top">Top</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}

            {formData.template === "card-grid-page" && (
              <div className="mb-4 border-t pt-4">
                <h3 className="text-md font-semibold mb-2">Cards</h3>
                <button type="button" onClick={addCard} className="px-3 py-2 mb-4 bg-emerald-600 text-white rounded"><FaPlus className="text-[#0f766e]" /> Add Card</button>
                {formData.cards.map((card, index) => (
                  <div key={card.id || index} className="p-4 border rounded-lg mb-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold text-sm">Card {index + 1}</h4>
                      <button type="button" onClick={() => removeCard(card.id)} className="p-1 text-red-500"><FaTrash /></button>
                    </div>
                    <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Card Title" value={card.title} onChange={(e) => setCardField(card.id, "title", e.target.value)} />
                    <textarea className="w-full p-2 border rounded mb-2 text-sm" placeholder="Description" value={card.description} onChange={(e) => setCardField(card.id, "description", e.target.value)} rows="2" />
                    <CloudinaryUpload onUploadSuccess={(url) => setCardField(card.id, "image", url)} folder="Pages/Cards" />
                    {card.image && <img src={card.image} alt="card" className="w-20 h-20 object-cover rounded mt-2" />}
                    <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Button Text" value={card.buttonText} onChange={(e) => setCardField(card.id, "buttonText", e.target.value)} />
                    <input className="w-full p-2 border rounded mb-2 text-sm" placeholder="Button Link" value={card.buttonLink} onChange={(e) => setCardField(card.id, "buttonLink", e.target.value)} />
                  </div>
                ))}
              </div>
            )}

            {/* New Color Theme Section */}
            <div className="mb-4 border-t pt-4">
              <h3 className="text-md font-semibold mb-2">Color Theme</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Page Background</label>
                  <input type="color" value={formData.colors.background.pageBgColor} onChange={(e) => setColorField('background', 'pageBgColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Content Background</label>
                  <input type="color" value={formData.colors.background.contentBgColor} onChange={(e) => setColorField('background', 'contentBgColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Heading Color</label>
                  <input type="color" value={formData.colors.text.headingColor} onChange={(e) => setColorField('text', 'headingColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Paragraph Color</label>
                  <input type="color" value={formData.colors.text.paragraphColor} onChange={(e) => setColorField('text', 'paragraphColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Button Color</label>
                  <input type="color" value={formData.colors.button.bgColor} onChange={(e) => setColorField('button', 'bgColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Button Text Color</label>
                  <input type="color" value={formData.colors.button.textColor} onChange={(e) => setColorField('button', 'textColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Button Hover</label>
                  <input type="color" value={formData.colors.button.hoverBgColor} onChange={(e) => setColorField('button', 'hoverBgColor', e.target.value)} className="w-full h-8" />
                </div>

                {/* New Card Color Fields */}
                <div>
                  <label className="block text-sm font-medium">Card Background</label>
                  <input type="color" value={formData.colors.card.bgColor} onChange={(e) => setColorField('card', 'bgColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Card Heading</label>
                  <input type="color" value={formData.colors.card.headingColor} onChange={(e) => setColorField('card', 'headingColor', e.target.value)} className="w-full h-8" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Card Description</label>
                  <input type="color" value={formData.colors.card.descriptionColor} onChange={(e) => setColorField('card', 'descriptionColor', e.target.value)} className="w-full h-8" />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded-lg font-semibold">{loading ? "Saving..." : (isEditing ? "Update Page" : "Create Page")}</button>
              <button type="button" onClick={() => setIsPreviewing(true)} className="px-4 py-2 bg-gray-500 text-white rounded-lg font-semibold flex items-center gap-2"><FaEye /> Preview</button>
              {isEditing && <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>}
            </div>
          </form>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Existing Pages</h2>
          <div className="space-y-2">
            {pages.map((p) => (
              <div key={p.url} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold">{p.mainTitle}</div>
                  <div className="text-sm text-gray-600">/{p.url} • {p.status}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-blue-500 text-white rounded-lg">Edit</button>
                  <button onClick={() => handleDelete(p.url)} className="px-3 py-1 bg-red-500 text-white rounded-lg">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewing && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-lg w-full h-full max-w-4xl max-h-[90vh] overflow-auto relative">
            <button onClick={() => setIsPreviewing(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10 p-2">
              <FaTimes size={24} />
            </button>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Live Preview</h2>
              <Page pageData={formData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}