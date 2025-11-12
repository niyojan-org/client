import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(extractCloudinaryConfig(process.env.CLOUDINARY_URL));

export const uploadFileToCloudinary = async (filePath, folder = 'misc') => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: 'auto',
            access_mode: 'public',
        });

        return result.secure_url;
    } catch (err) {
        console.error('Cloudinary upload failed:', err);
        throw new Error('Upload failed');
    }
};
