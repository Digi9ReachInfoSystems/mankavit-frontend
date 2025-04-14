import CryptoJS from 'crypto-js';

const encryptData = (payload) => {
  try {
    const encryptionKey =  import.meta.env.VITE_APP_ENCRYPTION_KEY; 

    const jsonString = JSON.stringify(payload);

    const iv = CryptoJS.lib.WordArray.random(16);

    const key = CryptoJS.enc.Utf8.parse(encryptionKey);

    const encrypted = CryptoJS.AES.encrypt(jsonString, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    console.log({
      iv: iv.toString(CryptoJS.enc.Hex),
      content: encrypted.ciphertext.toString(CryptoJS.enc.Hex)
    });

    return {
      iv: iv.toString(CryptoJS.enc.Hex),
      content: encrypted.ciphertext.toString(CryptoJS.enc.Hex)
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
};

export default encryptData;