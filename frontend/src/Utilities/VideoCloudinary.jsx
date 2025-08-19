import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Typography } from '@material-tailwind/react';

const VideoCloudinary = ({ onUploadSuccess, folder, isSubmitted, setIsSubmitted }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (isSubmitted) {
            setFile(null);
            setPreviewUrl(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setIsSubmitted(false);
        }
    }, [isSubmitted, setIsSubmitted]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.size > 20 * 1024 * 1024) { // 20MB limit
            setError('File size exceeds 20MB');
            return;
        }
        setFile(selectedFile);
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setIsDialogOpen(true);
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        setIsDialogOpen(false);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        formData.append('folder', folder);

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dbissplrq/video/upload', formData);
            onUploadSuccess(response.data.secure_url);
            console.log(response.data.secure_url);
        } catch (err) {
            setError('Error uploading video');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        setIsDialogOpen(false);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} accept="video/*" ref={fileInputRef} />
            {loading && <p>Uploading...</p>}
            {error && <p>{error}</p>}

            <Dialog open={isDialogOpen}>
                <div className='mt-4 mb-4'>
                    <Typography variant='h5' className='text-center text-black'>
                    Confirm Video Upload
                        </Typography>
                        </div>
                <DialogBody divider>
                    <video src={previewUrl} controls className="mb-4 w-full h-60 object-cover rounded-md" />
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

export default VideoCloudinary;
