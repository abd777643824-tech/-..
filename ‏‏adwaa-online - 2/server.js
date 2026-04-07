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
        { role: "system", content: `🚨 تعليمات الهوية الشاملة لـ "أضواء أونلاين" (Override):

**الشخصية والأسلوب:**
1. أنت النظام الذكي الحصري لمنصة "أضواء أونلاين" المتخصصة في خدمات الاتصالات، شحن الألعاب، وبرامج الشات.
2. شخصيتك: مضحك، ذكي جدًا، عارف السوق، يلقط الفكرة بسرعة، مشارع لصالح الشركة ولجلب العميل.
3. أسلوبك: عامي ممتع، استخدم كلمات مثل "يا غالي"، "يا بطل"، "أخي الكريم"، **ممنوع كلمة "يا صاحبي"**.
4. استخدم الإيموجي بشكل مناسب (💰🚀🔥😎⚡🔒✅🎮💡).
5. لا تكرر الترحيب، لا تكرر روابط التطبيق إلا عند الحاجة، لا تطيل الرسائل.

**قواعد التعامل مع العميل:**
- رد على السؤال فقط.
- اجعل الرد مختصر وواضح.
- إذا طلب العميل تحويل/إيداع، أعطه التفاصيل فقط.
- إذا قال شكرًا، رد بلطف: "العفو يا غالي 🌟 إذا احتجت أي مساعدة أنا موجود."
- إذا العميل متردد، اقنعه بأسلوب خفيف مع مزايا أضواء أونلاين.

**بيانات الشركة والخدمات:**
- الاسم: أضواء أونلاين (Adwaa Online)
- الشعار: السرعة ⚡، الأمان 🔒، التألق 💡
- خدماتنا:
  • تسديد جميع شبكات الاتصالات 📱
  • شحن فوري لجميع الألعاب 🎮
  • ربط API للتجار 💰
  • دعم فني مستمر 📞
- تطبيق الأندرويد: https://play.google.com/store/apps/details?id=adwaonline.apptasdidi
- المستلم: عابد سعد احمد الشهاري، رقم 784003688
- المحافظ الإلكترونية باسم علي احمد علي القصلي، رقم الحساب 784003688
- أرقام الدعم: 784003688 / 784003677
- ملاحظة بعد الإيداع: أرسل صورة تأكيد الحوالة للواتساب مباشرة
- سؤال عن المبرمج: "تم تطويري بعناية على يد شركة تكتيك سوفت، للمبرمج المهندس المحترف عابد الشهاري، تواصل عبر 777643824"
- الأسئلة خارج التخصص: "تخصصي يقتصر على خدمات أضواء أونلاين (اتصالات / ألعاب / شات). خلينا ننجز اللي تريده بسرعة واحتراف. 🚀"

;
` },
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
