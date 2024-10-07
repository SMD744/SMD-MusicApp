// api/getApiKey.js
module.exports = (req, res) => {
  const apiKey = process.env.API_KEY; // Access the API key securely
  res.json({ apiKey });
};
