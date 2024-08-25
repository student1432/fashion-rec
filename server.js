const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Replace these with your actual API keys
const KAIROS_APP_ID = '6d0f9d0f';
const KAIROS_APP_KEY = 'c5d77595af687adc21e8d873e6bafd3b';
const CHATGPT_API_KEY = 'sk-m_pgs0XZWexGTcSiiyFDCfzP-MKZ387qBahspFevrnT3BlbkFJ-0Hnh3T0dYzgyXql-1m19U6rk_ku-DUHNvLn_ja9UA';
app.post('/upload', async (req, res) => {
 const imageData = req.body.image; // Base64 image data sent from frontend
 try {
    // Step 1: Call Kairos API to detect skin tone
 const kairosResponse = await axios.post('https://api.kairos.com/enroll', {
    image: imageData,
    subject_id: '1',
    gallery_name: 'your_gallery_name'
    }, {
    headers: {
    'Content-Type': 'application/json',
    'app_id': KAIROS_APP_ID,
    'app_key': KAIROS_APP_KEY
    }
    });
    const skinTone = kairosResponse.data.results[0].skin_tone;
    // Step 2: Call ChatGPT API for fashion recommendations
    const chatGptResponse = await
   axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-4',
    messages: [{
    role: 'user',
    content: `Given the skin tone of ${skinTone}, what clothing style do you
recommend?`
 }]
 }, {
 headers: {
 'Authorization': `Bearer ${CHATGPT_API_KEY}`,
 'Content-Type': 'application/json'
 }
 });
 res.json({ recommendations:
chatGptResponse.data.choices[0].message.content });
 } catch (error) {
 console.error(error);
 res.status(500).send('Error processing request');
 }
});
app.listen(PORT, () => {
 console.log(`Server running on http://localhost:${PORT}`);
});