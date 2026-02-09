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

/**
 * Validate YouTube channel URLs using Gemini API
 * @param {Array} channels - Array of channel objects with name and url
 * @returns {Promise<Object>} Validation results with suspicious channels
 */
export async function validateYouTubeLinks(channels) {
  const channelsToValidate = channels.map(c => ({
    id: c.id,
    name: c.name,
    url: c.url,
    lang: c.lang
  }));

  const prompt = `You are a YouTube channel URL validator.
Given a list of YouTube channel names and URLs, verify if each URL is likely correct for the given channel name.

Instructions:
1. Check if the channel handle in the URL matches or is plausible for the channel name
2. Consider language: Korean channels (lang: "ko") should have Korean-related handles
3. Look for obvious mismatches (e.g., movie channel with gaming handle)
4. Flag any suspicious or likely incorrect URLs

Channels to validate:
${JSON.stringify(channelsToValidate, null, 2)}

Return JSON with this format:
{
  "validatedChannels": [
    {
      "id": "channel_id",
      "name": "Channel Name",
      "url": "https://www.youtube.com/@handle",
      "status": "valid" | "suspicious" | "invalid",
      "confidence": 0.0 to 1.0,
      "reason": "Explanation if suspicious or invalid",
      "suggestedUrl": "Corrected URL if you can suggest one (optional)"
    }
  ],
  "summary": {
    "total": number,
    "valid": number,
    "suspicious": number,
    "invalid": number
  }
}`;

  const data = await callGemini({
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ['TEXT'] },
  });

  const text = data.candidates?.[0]?.content?.parts?.find((p) => p.text)?.text;
  if (!text) throw new Error('No response from validation');

  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('No JSON in validation response');

  return JSON.parse(jsonMatch[0]);
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
