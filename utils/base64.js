// utils/base64.js
export function textToBase64(text) {
    return Buffer.from(text).toString('base64');
  }
  