const getBaseUrl = () => {
  const hostname = window.location.hostname;

  if (hostname.includes("localhost")) {
    return process.env.REACT_APP_BASE_URL;
  } else {
    return process.env.REACT_APP_BASE_URL;
  }
};

const URL = getBaseUrl();

export default URL;
