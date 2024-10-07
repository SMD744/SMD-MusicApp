// api/getApiKey.js
module.exports = (req, res) => {
  try {
    const apiKey = process.env.API_KEY; // Access the API key securely
    if (!apiKey) {
      throw new Error("API Key not found");
    }
    res.status(200).json({ apiKey });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve API key" });
  }
};
