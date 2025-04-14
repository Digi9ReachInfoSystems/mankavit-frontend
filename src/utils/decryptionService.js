import CryptoJS from 'crypto-js';
const decryptData = (encryptedData, iv) => {


    try {
    const encryptionKey =  import.meta.env.VITE_APP_ENCRYPTION_KEY; 
    const key = CryptoJS.enc.Utf8.parse(encryptionKey);
    const ivKey = CryptoJS.enc.Hex.parse(iv);

    const encryptedHex = CryptoJS.enc.Hex.parse(encryptedData);
    const encryptedDataObj = CryptoJS.lib.CipherParams.create({
      ciphertext: encryptedHex
    });
    const decrypted = CryptoJS.AES.decrypt(
      encryptedDataObj,
      key,
      {
        iv: ivKey,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }
    );
    return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Failed to decrypt data');
    }
};

export default decryptData;