import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { fill } from '@cloudinary/url-gen/actions/resize';

class CloudinaryService {
  constructor() {
    this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    this.apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    this.apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET;
    this.cld = new Cloudinary({
      cloud: {
        cloudName: this.cloudName,
      },
      url: {
        secure: true // Force https
      }
    });
  }  async generateSignature(params) {
    // Sort parameters alphabetically
    const sortedParams = Object.keys(params).sort().reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});

    // Create string to sign
    const stringToSign = Object.entries(sortedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&') + this.apiSecret;

    // Generate SHA-1 hash
    const msgUint8 = new TextEncoder().encode(stringToSign);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async uploadImage(file, onProgress) {    try {
      const timestamp = new Date().getTime();
      
      // Create params object for signature generation
      const params = {
        folder: 'business/estate',
        overwrite: 'true',
        timestamp: timestamp.toString(),
        unique_filename: 'true',
        use_filename: 'false',
        use_filename_as_display_name: 'true'
      };
      
      const signature = await this.generateSignature(params);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', this.apiKey);
      formData.append('signature', signature);
      
      // Append all params to formData
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const xhr = new XMLHttpRequest();
      
      const promise = new Promise((resolve, reject) => {
        xhr.open('POST', `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, true);
        
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable && onProgress) {
            const progress = Math.round((e.loaded * 100) / e.total);
            onProgress(progress);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            resolve({
              url: response.secure_url,
              publicId: response.public_id,
              width: response.width,
              height: response.height,
              format: response.format
            });
          } else {
            const errorResponse = JSON.parse(xhr.response);
            reject(new Error(errorResponse.error?.message || 'Upload failed. Please check your upload preset configuration.'));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Network error occurred during upload. Please try again.'));
        };

        xhr.send(formData);
      });

      return promise;
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error(error.message || 'Failed to upload image. Please make sure your upload preset is properly configured.');
    }
  }

  async uploadMultipleImages(files) {
    try {
      const uploadPromises = Array.from(files).map(file => this.uploadImage(file));
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw error;
    }
  }

  getImage(publicId) {
    return this.cld
      .image(publicId)
      .format('auto')
      .quality('auto');
  }

  createImageThumbnail(publicId) {
    return this.cld
      .image(publicId)
      .format('auto')
      .quality('auto')
      .resize(fill().width(300).height(200).gravity(autoGravity()));
  }

  getResponsiveImage(publicId) {
    return this.cld
      .image(publicId)
      .format('auto')
      .quality('auto')
      .resize(auto().gravity(autoGravity()));
  }

  getBackgroundImage(publicId, width = 1920) {
    return this.cld
      .image(publicId)
      .format('auto')
      .quality('auto')
      .resize(fill().width(width).gravity(autoGravity()));
  }
}

export default CloudinaryService;
