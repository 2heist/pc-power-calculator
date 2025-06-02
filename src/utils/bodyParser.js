'use strict';

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB

const parseBody = (req, callback) => {
  let body = '';
  let bodySize = 0;

  req.on('data', chunk => {
    bodySize += chunk.length;
        
    if (bodySize > MAX_BODY_SIZE) {
      const error = new Error('Request body too large');
      error.status = 413;
      callback(error);
      req.destroy();
      return;
    }

    body += chunk.toString();
  });

  req.on('end', () => {
    try {
      const parsedData = JSON.parse(body);
      callback(null, parsedData);
    } catch (error) {
      const parseError = new Error('Invalid JSON format');
      parseError.status = 400;
      callback(parseError);
    }
  });

  req.on('error', (err) => {
    const serverError = new Error('Server error processing request');
    serverError.status = 500;
    callback(serverError);
  });
};

module.exports = {
  parseBody
};