import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from '@material-tailwind/react';

const CloudinaryUpload = ({ onUploadSuccess, folder, isSubmitted, setIsSubmitted, multiple = false }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (isSubmitted) {
      setFiles([]);
      setPreviewUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setIsSubmitted(false);
    }
  }, [isSubmitted, setIsSubmitted]);

  const handleFileChange = (e) => {
    const selectedFiles = multiple ? Array.from(e.target.files) : [e.target.files[0]];
    setFiles(selectedFiles);
    setPreviewUrls(selectedFiles.map((f) => URL.createObjectURL(f)));
    setIsDialogOpen(true);
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setLoading(true);
    setError(null);
    setIsDialogOpen(false);

    try {
      const uploadedUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        formData.append('folder', folder);

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dbissplrq/image/upload',
          formData
        );
        uploadedUrls.push(response.data.secure_url);
      }

      // If single upload, return the first URL only
      if (multiple) onUploadSuccess(uploadedUrls);
      else onUploadSuccess(uploadedUrls[0]);

    } catch (err) {
      setError('Error uploading image(s)');
      console.error(err);
    } finally {
      setLoading(false);
      setFiles([]);
      setPreviewUrls([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsDialogOpen(false);
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        ref={fileInputRef}
        multiple={multiple}
        accept="image/*"
        className="w-full"
      />
      {loading && <p className="text-gray-700">Uploading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <Dialog open={isDialogOpen}>
        <DialogHeader>Confirm Upload</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`Preview ${idx}`}
                className="w-24 h-24 object-cover rounded-md border"
              />
            ))}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="gradient" color="green" onClick={handleUpload}>
            Confirm
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default CloudinaryUpload;
