import { v4 as uuidv4 } from 'uuid';

export const getDeviceInfo = async () => {
  // let deviceId = localStorage.getItem('deviceId');
  let deviceId = document.cookie
    .split('; ')
    .find(row => row.startsWith('deviceId='))
    ?.split('=')[1];
    // // console.log("deviceId", deviceId== undefined ,( deviceId === null ? "not found" : deviceId));
  if (deviceId== undefined || deviceId === null) {
    deviceId = uuidv4();
    localStorage.setItem('deviceId', deviceId);
    document.cookie = `deviceId=${deviceId}; path=/; max-age=604800;`;
  }
  // // console.log("deviceId", deviceId);

  const userAgent = navigator.userAgent;

  let browser_name = "Unknown";
  if (/Chrome/.test(userAgent)) browser_name = "Chrome";
  else if (/Firefox/.test(userAgent)) browser_name = "Firefox";
  else if (/Safari/.test(userAgent)) browser_name = "Safari";
  else if (/Edg/.test(userAgent)) browser_name = "Edge";

  const deviceType = /Android/i.test(userAgent)
    ? "android"
    : /iPhone|iPad|iPod/i.test(userAgent)
      ? "ios"
      : "web";

  const ip = await fetch("https://api.ipify.org?format=json")
    .then(res => res.json())
    .then(data => data.ip)
    .catch(() => "unknown");

  return {
    deviceId,
    deviceType,
    browser_name,
    userAgent,
    ipAddress: ip
  };
};
