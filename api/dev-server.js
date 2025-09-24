// api/dev-server.js (ESM)
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // reads OPENAI_API_KEY from .env.local

import express from 'express';
import handler from './chat.js';

const app = express();
app.use(express.json());
app.post('/api/chat', (req, res) => handler(req, res));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Local API running at http://localhost:${PORT}/api/chat`);
});
