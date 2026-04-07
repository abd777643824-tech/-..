require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const MODEL = "models/gemini-2.5-flash";

app.use(express.json());
app.use(express.static('public')); // يخدم ملفات HTML/CSS/JS

app.post('/chat', async (req, res) => {
  const userText = req.body.text;

  try {
    const payload = {
      prompt: [
        { role: "system", content: `🚨 تعليمات أضواء أونلاين...` },
        { role: "user", content: userText }
      ]
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "💡 لا يوجد رد من السيرفر";
    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.json({ reply: "💡 حصل خطأ في السيرفر، حاول مرة ثانية" });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));