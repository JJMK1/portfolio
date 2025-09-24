// api/chat.js  — Test-friendly handler with MOCK mode
// Works in your local Express dev server and on Vercel.

export default async function handler(req, res) {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message = '' } = req.body || {};

    // Toggle with env var. Also auto-mock if there’s no key.
    const USE_MOCK = process.env.MOCK_CHAT === '1' || !process.env.OPENAI_API_KEY;

    if (USE_MOCK) {
      await sleep(350); // simulate typing
      return res.status(200).json({ reply: mockReply(message) });
    }

    // ---- REAL OpenAI path (kept for later) ----
    const apiKey = process.env.OPENAI_API_KEY;
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: "You are Jek's friendly website assistant. Keep replies short and helpful." },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
      }),
    });

    const data = await openaiRes.json();

    // Friendly fallback if you ever hit quota again:
    if (openaiRes.status === 429) {
      return res.status(200).json({
        reply: `I’m at my usage limit right now, so here’s a quick echo: “${message}”.`,
      });
    }

    if (!openaiRes.ok) {
      console.error('OpenAI error', data);
      return res.status(openaiRes.status).json({ error: data.error || data || 'LLM request failed' });
    }

    const reply = data.choices?.[0]?.message?.content?.trim() || '…';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal error' });
  }
}

// --- Tiny rule-based mock bot for testing ---
function mockReply(input) {
  const text = (input || '').trim();
  const lower = text.toLowerCase();

  if (!text) return "Hey! 👋 I’m in demo mode. Ask me about my projects, skills, or how this site was built.";
  if (/\b(hi|hello|hey|yo|sup)\b/.test(lower)) return "Hey there! 👋 What can I help you with?";
  if (/who\s+are\s+you|about\s+you|your\s+name/.test(lower)) return "I’m Jek’s site bot in demo mode. I can point you to sections and answer quick questions.";
  if (/project|portfolio|work|recent/i.test(lower)) return "Check the Projects section for highlights. Want a quick summary of a specific project?";
  if (/skill|stack|tech|tools?/i.test(lower)) return "Typical stack: React + Vite + Tailwind on the front, Node/Express on the back. I also use GSAP and Framer Motion.";
  if (/contact|email|reach|hire/i.test(lower)) return "Head to the Contact section or use the footer links. Happy to chat!";
  if (/resume|cv/.test(lower)) return "You’ll find the resume/CV link in the navbar. Want me to highlight key experience?";
  if (/chatbot|how.*built|how did you build/.test(lower)) return "This widget is React + Tailwind. Backend is a Vercel function. In dev I’m replying with a simple mock.";
  if (text.length <= 6) return `“${text}” — got it. Tell me a bit more so I can help 🙂`;

  return `You said: “${text}”. I’m in demo mode now, but I can still guide you around the site.`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
