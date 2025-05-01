const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

const API_KEY = 'AIzaSyBK933R0dHt8i-NjrRRjKBwWuwIKYICVDs';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + API_KEY;

app.use(express.json());
app.use(express.static(__dirname)); // 讓 ai.html 可以直接開

app.post('/ai', async (req, res) => {
  try {
    const userText = req.body.text;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `你是一個晚餐推薦專家，請根據使用者的需求推薦晚餐，並用繁體中文回答。問題：${userText}` }] }]
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
