import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Button, Input, Select, Option } from '@material-tailwind/react';
import { motion } from 'framer-motion';
import AxiosRequest from '../../../AxiosRequest/AxiosRequest';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../State/Reducers/tokenSlice';
import CloudinaryUpload from '../../../../Utilities/Cloudinary';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AllProjects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const storedToken = localStorage.getItem('token');
  const token = useSelector(selectToken) || storedToken;

  const fetchProjects = async () => {
    try {
      const res = await AxiosRequest.get('/api/project/getProject', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data || []);
    } catch (err) {
      toast.error('Failed to fetch projects');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await AxiosRequest.delete(`/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Project deleted successfully');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error('Failed to delete project');
    }
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    try {
      await AxiosRequest.put(
        `/api/project/${selectedProject._id}`,
        selectedProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Project updated successfully');
      setIsEditing(false);
      fetchProjects();
    } catch (err) {
      toast.error('Failed to update project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-6">All Projects</h2>

      {/* Card Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-white border rounded-lg shadow-md flex flex-col overflow-hidden"
          >
            {/* Image */}
            {p.images?.[0] && (
              <img
                src={p.images[0]}
                alt={p.title}
                className="h-48 w-full object-cover"
              />
            )}

            {/* Card Body */}
            <div className="flex flex-col flex-grow p-4">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{p.area}</p>
              <p className="text-sm text-gray-800 flex-grow">
                {p.description?.length > 80
                  ? p.description.slice(0, 80) + '...'
                  : p.description}
              </p>
              <span
                className={`text-xs font-medium px-2 py-1 mt-2 rounded ${
                  p.projectStatus === 'Completed'
                    ? 'bg-green-100 text-green-700'
                    : p.projectStatus === 'Ongoing'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {p.projectStatus}
              </span>

              {/* Thumbnails */}
              {p.images?.length > 1 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {p.images.slice(1, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded border"
                    />
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="text-blue-500"
                  onClick={() => {
                    setSelectedProject({ ...p });
                    setIsEditing(true);
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(p._id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isEditing && selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>
            <form onSubmit={handleEditSave}>
              <div className="mb-4">
                <Input
                  label="Title"
                  value={selectedProject.title}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Area"
                  value={selectedProject.area}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, area: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={selectedProject.description}
                  onChange={(e) =>
                    setSelectedProject({ ...selectedProject, description: e.target.value })
                  }
                  rows="4"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                  required
                />
              </div>
              <div className="mb-4">
                <Select
                  label="Status"
                  value={selectedProject.projectStatus}
                  onChange={(val) =>
                    setSelectedProject({ ...selectedProject, projectStatus: val })
                  }
                  required
                >
                  <Option value="Pending">Pending</Option>
                  <Option value="Ongoing">Ongoing</Option>
                  <Option value="Completed">Completed</Option>
                </Select>
              </div>

              {/* Images */}
              <div className="mb-4">
                <label className="block mb-1 text-gray-700 font-medium">Images</label>
                <CloudinaryUpload
                  onUploadSuccess={(urlOrUrls) => {
                    if (!urlOrUrls) return;
                    let urls = [];
                    if (Array.isArray(urlOrUrls)) {
                      urls = urlOrUrls.map((u) =>
                        typeof u === 'object' ? u.secure_url : u
                      );
                    } else {
                      urls = [
                        typeof urlOrUrls === 'object'
                          ? urlOrUrls.secure_url
                          : urlOrUrls,
                      ];
                    }
                    setSelectedProject((prev) => ({
                      ...prev,
                      images: [...(prev.images || []), ...urls],
                    }));
                  }}
                  folder="Projects"
                  multiple={true}
                />
                <div className="flex gap-2 mt-2 flex-wrap">
                  {selectedProject.images?.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16">
                      <img
                        src={img}
                        alt="preview"
                        className="w-16 h-16 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedProject((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }))
                        }
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  color="red"
                  onClick={() => setIsEditing(false)}
                  className="shadow-none"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-black shadow-none">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AllProjects;
