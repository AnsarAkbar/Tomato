// utils/responseUtil.js

const responseUtil = {
  success: (res, data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
      success: true,
      message,
      data
    });
  },

  created: (res, data = {}, message = 'Resource created successfully') => {
    return res.status(201).json({
      success: true,
      message,
      data
    });
  },

  error: (res, message = 'An error occurred', statusCode = 500, errors = {}) => {
    return res.status(statusCode).json({
      success: false,
      message,
      errors
    });
  },

  notFound: (res, message = 'Resource not found') => {
    return res.status(404).json({
      success: false,
      message
    });
  },

  unauthorized: (res, message = 'Unauthorized') => {
    return res.status(401).json({
      success: false,
      message
    });
  },

  forbidden: (res, message = 'Forbidden') => {
    return res.status(403).json({
      success: false,
      message
    });
  },

  badRequest: (res, message = 'Bad Request', errors = {}) => {
    return res.status(400).json({
      success: false,
      message,
      errors
    });
  }
};

module.exports = responseUtil;