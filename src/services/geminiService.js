const DIRECT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const PROXY_URL = '/api/gemini';

async function callGemini(body) {
  if (DIRECT_API_KEY) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${DIRECT_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'API error');
    return data;
  }

  const response = await fetch(PROXY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'API error');
  return data;
}

export async function recommendChannels({ genre, tone, spoilerPolicy, lang, channels }) {
  const compact = channels.map((c) => ({
    id: c.id,
    name: c.name,
    lang: c.lang,
    genres: c.genres,
    tone: c.tone,
    spoilerPolicy: c.spoilerPolicy,
    style: c.style,
    summary: c.summary,
  }));

  const languageName = lang === 'en' ? 'English' : 'Korean';
  const prompt = `You are a movie channel recommender. Select 5 channels that best match the user's preferences.\n` +
    `Return JSON only in ${languageName}.\n` +
    `User: genre=${genre}, tone=${tone}, spoilerPolicy=${spoilerPolicy}.\n` +
    `Channels: ${JSON.stringify(compact)}\n\n` +
    `Return format:\n{\n  "picks": [\n    {"id":"...","reason":"..."}\n  ]\n}`;

  const data = await callGemini({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT'] },
  });

  const text = data.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  if (!text) throw new Error('No response');
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON');
  return JSON.parse(jsonMatch[0]);
}
