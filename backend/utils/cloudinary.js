const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const multer = require('multer');
const sharp = require('sharp');

// Configure Cloudinary (use environment variables in production)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration (stores files temporarily in memory)
const upload = multer({ storage: multer.memoryStorage() });

const compressor = async (buffer) => {
  return await sharp(buffer).resize({ width: 800, height: 600, fit: 'contain' }).toBuffer();
};


/**
 * Uploads a file to Cloudinary (supports Buffer, Base64, or file path)
 * @param {Buffer|string} file - File data (Buffer, Base64, or temp path)
 * @param {string} folder - Cloudinary folder name (optional)
 * @param {object} transformations - Image transformations (optional)
 * @returns {Promise<object>} Cloudinary upload result
 */
const uploadToCloudinary = async (file, folder = 'products', transformations = {}) => {
  const compressedFile = await compressor(file);
  return new Promise((resolve, reject) => {
    if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, ...transformations },
        (error, result) => error ? reject(error) : resolve(result)
      );
      streamifier.createReadStream(compressedFile).pipe(uploadStream);
    } else {
      cloudinary.uploader.upload(compressedFile, { folder, ...transformations })
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

const updateFromCloudinary = async (file, folder = 'products', transformations = {}, oldPublicId = null) => {
  return new Promise(async (resolve, reject) => {
    const handleResult = (result) => {
      if (oldPublicId) {
        cloudinary.uploader.destroy(oldPublicId)
          .then(() => resolve(result))
          .catch(() => resolve(result));
      } else {
        resolve(result);
      }
    };
    const compressedFile = await compressor(file);
    if (Buffer.isBuffer(file)) {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, ...transformations },
        (error, result) => error ? reject(error) : handleResult(result)
      );
      streamifier.createReadStream(compressedFile).pipe(uploadStream);
    } else {
      cloudinary.uploader.upload(compressedFile, { folder, ...transformations })
        .then(handleResult)
        .catch(reject);
    }
  });
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  getCloudinaryUrl,
  updateFromCloudinary,
  upload
};