
function getApiURL(url) {
    const currentURL = url;
    console.log(currentURL);
    const localhostBackend = 'http://localhost:8010';
    const nitjServer = 'https://xceed.nitj.ac.in';
    const productionFrontend = 'https://ams-with-timetable.onrender.com';
  
    if (currentURL.includes('localhost')) {
      return localhostBackend;
    } else if (currentURL.includes('amsss')) {
        console.log("onrender");
      return productionFrontend;
    } else if (currentURL.includes('xceed.nitj.ac.in')) {
      return nitjServer;
    } else {
        console.log("local");
      // Default to localhost if no match is found
      return localhostBackend;
    }
  }
  
  module.exports = getApiURL;
  
