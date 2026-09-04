const res = await fetch(
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyFakeKeyTest123',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'hi' }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  }
);

console.log('Status:', res.status);
const data = await res.json();
console.log('Response:', data);
