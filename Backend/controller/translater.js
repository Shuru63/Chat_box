const { translateText } = require('node-translator');


const translateMessage = async (message, preferredLanguage) => {
  try {
    const response = await translateText(message, preferredLanguage);
    
    console.log("Response from translation API:", response);
    return response;  
  } catch (error) {
    console.error("Translation error:", error.message); 
    throw new Error("Translation failed: " + error.message); 
  }
};

module.exports = translateMessage;
