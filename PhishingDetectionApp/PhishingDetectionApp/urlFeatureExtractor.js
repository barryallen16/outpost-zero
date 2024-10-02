export const extractFeatures = (url) => {
    // Use regex to extract components of the URL
    const urlComponents = parseURL(url);
  
    const features = [
      hostnameLength(urlComponents.hostname),
      urlLength(urlComponents.pathname),
      fdLength(urlComponents.pathname),
      ...getCounts(url),
      digitCount(url),
      letterCount(url),
      noOfDir(url),
      havingIPAddress(url),
    ];
  
    return features;
  };
  
  const parseURL = (url) => {
    const pattern = /^(https?:\/\/)?([^\/]+)(\/[^?]*)?(\?.*)?$/;
    const matches = url.match(pattern);
    
    return {
      protocol: matches[1] || '',
      hostname: matches[2] || '',
      pathname: matches[3] || '',
      query: matches[4] || '',
    };
  };
  
  const fdLength = (path) => {
    const parts = path.split('/');
    return parts.length > 1 ? parts[1].length : 0;
  };
  
  const digitCount = (url) => {
    return Array.from(url).filter((char) => /\d/.test(char)).length;
  };
  
  const letterCount = (url) => {
    return Array.from(url).filter((char) => /[a-zA-Z]/.test(char)).length;
  };
  
  const noOfDir = (url) => {
    return url.split('/').length - 1;
  };
  
  const havingIPAddress = (url) => {
    const ipRegex = /((([01]?\d\d?|2[0-4]\d|25[0-5])\.?){4})/;
    return ipRegex.test(url) ? -1 : 1;
  };
  
  const hostnameLength = (hostname) => {
    return hostname.length;
  };
  
  const urlLength = (pathname) => {
    return pathname.length;
  };
  
  const getCounts = (url) => {
    return [
      (url.match(/-/g) || []).length,
      (url.match(/@/g) || []).length,
      (url.match(/\?/g) || []).length,
      (url.match(/%/g) || []).length,
      (url.match(/\./g) || []).length,
      (url.match(/=/g) || []).length,
      (url.match(/http/g) || []).length,
      (url.match(/https/g) || []).length,
      (url.match(/www/g) || []).length,
    ];
  };
  