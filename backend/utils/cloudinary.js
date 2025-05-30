const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

// Configure Cloudinary (use environment variables in production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a file to Cloudinary (supports Buffer, Base64, or file path)
 * @param {Buffer|string} file - File data (Buffer, Base64, or temp path)
 * @param {string} folder - Cloudinary folder name (optional)
 * @param {object} transformations - Image transformations (optional)
 * @returns {Promise<object>} Cloudinary upload result
 */
const uploadToCloudinary = (file, folder = 'products', transformations = {}) => {
  return new Promise((resolve, reject) => {
    // Handle Buffer data (from Multer memory storage)
    if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, ...transformations },
        (error, result) => error ? reject(error) : resolve(result)
      );
      streamifier.createReadStream(file).pipe(uploadStream);
    } 
    // Handle Base64 or file path
    else {
      cloudinary.uploader.upload(file, { folder, ...transformations })
        .then(resolve)
        .catch(reject);
    }
  });
};


/**
 * Deletes a file from Cloudinary using its public ID
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<object>} Cloudinary deletion result
 */
const deleteFromCloudinary = (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

/**
 * Generates a Cloudinary URL with transformations
 * @param {string} publicId - Cloudinary public ID
 * @param {object} transformations - Transformation options
 * @returns {string} Transformed URL
 */
const getCloudinaryUrl = (publicId, transformations = {}) => {
  return cloudinary.url(publicId, {
    secure: true,
    ...transformations,
  });
};

const updateFromCloudinary = (file, folder = 'products', transformations = {}, oldPublicId = null) => {
  return new Promise((resolve, reject) => {
    const handleResult = (result) => {
      if (oldPublicId) {
        cloudinary.uploader.destroy(oldPublicId)
          .then(() => resolve(result))
          .catch(() => resolve(result)); // Ignore deletion errors, still resolve upload
      } else {
        resolve(result);
      }
    };
    if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, ...transformations },
        (error, result) => error ? reject(error) : handleResult(result)
      );
      streamifier.createReadStream(file).pipe(uploadStream);
    } 
    // Handle Base64 or file path
    else {
      cloudinary.uploader.upload(file, { folder, ...transformations })
        .then(handleResult)
        .catch(reject);
    }
  });
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  getCloudinaryUrl,
  updateFromCloudinary
};