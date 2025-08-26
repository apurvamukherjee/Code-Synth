// This file contains a custom hook for managing file uploads.

import { useState } from 'react';

const useUpload = (uploadUrl) => {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    const uploadFile = async (file) => {
        setIsUploading(true);
        setError(null);
        setProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData,
                onUploadProgress: (event) => {
                    if (event.lengthComputable) {
                        const percentCompleted = Math.round((event.loaded * 100) / event.total);
                        setProgress(percentCompleted);
                    }
                },
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            return await response.json();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUploading(false);
        }
    };

    return { uploadFile, isUploading, error, progress };
};

export default useUpload;