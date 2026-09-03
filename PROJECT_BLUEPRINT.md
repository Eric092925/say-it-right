# Say It Right — Website Blueprint

## 1. Website Purpose

**Say It Right** is an AI-powered English communication tool designed to help users:

1. Understand and pronounce words, names and places
2. Hear pronunciation in different English accents
3. Improve written messages
4. Rewrite messages in different tones
5. Listen to the improved message

### Core positioning

> **Say It Right — Speak it right. Write it better.**

The website should remain simple enough that a user can arrive, type something, and get an answer immediately.

---

# 2. Main Website Structure

```text
SAY IT RIGHT
│
├── Home
│
├── Word Mode
│   ├── Meaning
│   ├── Easy Pronunciation
│   ├── IPA
│   ├── Accent Selection
│   └── Listen
│
├── Message Mode
│   ├── Original Message
│   ├── Tone Selection
│   ├── AI Rewrite
│   ├── Multiple Versions
│   ├── Copy
│   ├── Listen
│   └── Regenerate
│
├── About
│
├── Privacy
│
└── Terms
```

For the first release, keep the visible navigation simple:

```text
Say It Right

[ Word ] [ Message ]

About    Privacy
```

---

# 3. Homepage

The homepage is the most important page.

## Header

```text
┌───────────────────────────────────────────────┐
│  Say It Right                 Word  Message   │
└───────────────────────────────────────────────┘
```

Logo:

**Say It Right**

Possible subtitle:

> Pronounce it better. Write it better.

---

# 4. Main Input Area

The user should immediately understand what to do.

## Word mode

```text
What do you want to say?

┌─────────────────────────────────────────────┐
│ Enter a word, name or place...              │
└─────────────────────────────────────────────┘

English style:

[ 🇦🇺 Australian ▼ ]

                 [ Say It Right ]
```

Accent dropdown:

```text
🇦🇺 Australian
🇬🇧 British
🇺🇸 American
🇨🇦 Canadian
🇳🇿 New Zealand
```

---

# 5. Word Mode

Word Mode is designed for:

- Difficult words
- Names
- Suburbs
- Cities
- Countries
- Places
- Unusual words
- Words with confusing pronunciation

Example:

```text
Maroubra
```

Result:

```text
MAROUBRA

Meaning
A coastal suburb in Sydney, Australia.

Easy pronunciation
muh-ROO-bruh

IPA
/məˈruːbrə/

🇦🇺 Australian

🔊 Listen
```

When the user changes:

```text
Australian → British
```

the application should regenerate the pronunciation information if required.

---

# 6. Word Result Architecture

The AI should return structured information rather than free-form text.

Conceptually:

```json
{
  "type": "word",
  "word": "Maroubra",
  "meaning": "A coastal suburb in Sydney, Australia.",
  "pronunciation": "muh-ROO-bruh",
  "ipa": "/məˈruːbrə/",
  "accent": "Australian"
}
```

The application should validate the AI response before displaying it.

This is particularly important because an invalid response previously produced:

> The AI returned an invalid word response.

---

# 7. Message Mode

Message Mode handles sentences and longer text.

Example:

```text
┌─────────────────────────────────────────────┐
│ Type your message...                        │
│                                             │
│                                             │
└─────────────────────────────────────────────┘
```

Tone:

```text
Professional ▼
```

Available tones:

```text
Professional
Friendly
Polite
Confident
Casual
```

Then:

```text
              [ Say It Right ]
```

---

# 8. Message Result

Example input:

> Can you send me the report when you have time?

Professional:

```text
Improved message

Could you please send me the report when you have a chance?

                         📋 Copy
                         🔊 Listen
```

If multiple versions are generated:

```text
Version

[ Version 1 ▼ ]

Could you please send me the report when you have a chance?
```

Use a dropdown for version selection rather than separate 1 / 2 / 3 buttons.

---

# 9. Message Regeneration

Regeneration should be deliberately limited.

```text
[ Regenerate ]
```

Maximum:

**3 generated versions per request**

Conceptually:

```text
Initial generation
       │
       ▼
Version 1
       │
       ├── Regenerate
       ▼
Version 2
       │
       ├── Regenerate
       ▼
Version 3
       │
       ▼
Regenerate disabled
```

This controls API usage and keeps the interface simple.

---

# 10. Listen Function

For Message Mode, the application should only speak the improved message.

Example:

```text
🔊 Listen
```

should speak:

> Could you please send me the report when you have a chance?

It should not speak explanatory text such as:

> Here is a professional version...

---

# 11. Browser Text-to-Speech

The current architecture can use the browser's:

```text
speechSynthesis
```

API.

Voice selection should attempt:

```text
en-AU
en-GB
en-US
en-CA
en-NZ
```

with a suitable fallback if the requested voice is not installed.

Conceptually:

```text
User selects Australian
        │
        ▼
Find en-AU voice
        │
        ├── Found → use it
        │
        └── Not found
               │
               ▼
          suitable fallback
```

Available voices vary between Windows, Chrome, Edge, macOS, iPhone and Android.

---

# 12. AI Architecture

The browser must never contain the AI API key.

Correct architecture:

```text
                 USER
                   │
                   ▼
             Next.js UI
                   │
                   │ POST
                   ▼
             /api/ai
                   │
                   ▼
          Server-side AI client
                   │
                   ▼
              AI Provider
                   │
                   ▼
            Structured JSON
                   │
                   ▼
             /api/ai
                   │
                   ▼
             Next.js UI
```

---

# 13. Environment Variables

Development configuration currently follows the `.dev.vars` approach.

Conceptually:

```text
NEXTJS_ENV=development

AI_API_URL=...
AI_API_KEY=...
AI_MODEL=...
```

The API key must remain server-side.

Never expose the API key through a browser-visible variable such as:

```text
NEXT_PUBLIC_AI_API_KEY
```

---

# 14. `/api/ai`

The main AI endpoint should handle both modes.

```text
POST /api/ai
```

Word request:

```json
{
  "mode": "word",
  "input": "Maroubra",
  "accent": "Australian"
}
```

Message request:

```json
{
  "mode": "message",
  "input": "Can you send me the report?",
  "tone": "Professional"
}
```

---

# 15. AI Response Validation

This should be a major part of the production architecture.

```text
AI response
     │
     ▼
Parse JSON
     │
     ▼
Validate structure
     │
 ┌───┴────┐
 │        │
Valid   Invalid
 │        │
 ▼        ▼
Display   Error
```

## Word Mode required fields

```text
type
word
meaning
pronunciation
ipa
accent
```

## Message Mode required fields

```text
type
versions
```

where:

```text
versions = [
  "...",
  "...",
  "..."
]
```

---

# 16. Error Handling

The user should never see raw server errors such as:

```text
502 Bad Gateway
```

or:

```text
AI_API_URL is not configured
```

Instead:

```text
Something went wrong.

Please try again.
```

Detailed technical errors can remain in development logs.

Architecture:

```text
                    AI ERROR
                       │
             ┌─────────┴─────────┐
             │                   │
        Development          Production
             │                   │
             ▼                   ▼
       Detailed log        Friendly message
```

---

# 17. Important API Error Cases

The application should handle:

## Configuration

```text
AI_API_URL missing
AI_API_KEY missing
AI_MODEL missing
```

## Network

```text
AI provider unavailable
Timeout
502
503
504
```

## AI response

```text
Invalid JSON
Missing field
Wrong response type
Unexpected format
```

## User input

```text
Empty input
Input too long
Unsupported request
```

---

# 18. Word Detection

The existing concept:

```text
looksLikeSingleTerm()
```

is useful for detecting words versus messages.

Example:

```text
"entrepreneur"
```

→ Word Mode

while:

```text
"Can you please send me the report?"
```

→ Message Mode

However, the long-term recommendation is to let the user explicitly select the mode:

```text
[ Word ] [ Message ]
```

Automatic detection can remain as a convenience.

---

# 19. Recommended User Flow — Word

```text
Open website
     │
     ▼
Select Word
     │
     ▼
Enter "Maroubra"
     │
     ▼
Select Australian
     │
     ▼
Say It Right
     │
     ▼
AI
     │
     ▼
Meaning
Pronunciation
IPA
     │
     ▼
Listen
```

---

# 20. Recommended User Flow — Message

```text
Open website
     │
     ▼
Select Message
     │
     ▼
Enter message
     │
     ▼
Select tone
     │
     ▼
Say It Right
     │
     ▼
AI
     │
     ▼
Version 1
     │
 ┌───┴────────────┐
 │                │
Copy             Listen
 │
 ▼
Regenerate
 │
 ▼
Version 2
 │
 ▼
Version 3
 │
 ▼
Regeneration disabled
```

---

# 21. Current Technical Stack

```text
Frontend
   │
   └── Next.js 16

Language
   │
   └── TypeScript

AI
   │
   └── AI provider API

Hosting
   │
   └── Cloudflare

Runtime / deployment
   │
   └── Cloudflare Workers / OpenNext

Local development
   │
   └── Windows + Node.js

Speech
   │
   └── Browser speechSynthesis
```

Current project directory:

```text
C:\WebProjects\say-it-right
```

---

# 22. Suggested Project Structure

Recommended future organization:

```text
say-it-right/
│
├── src/
│   └── app/
│       │
│       ├── page.tsx
│       ├── layout.tsx
│       ├── globals.css
│       │
│       ├── api/
│       │   ├── ai/
│       │   │   └── route.ts
│       │   │
│       │   └── ai-test/
│       │       └── route.ts
│       │
│       ├── about/
│       │   └── page.tsx
│       │
│       ├── privacy/
│       │   └── page.tsx
│       │
│       └── terms/
│           └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── ModeSelector.tsx
│   ├── WordInput.tsx
│   ├── MessageInput.tsx
│   ├── AccentSelector.tsx
│   ├── ToneSelector.tsx
│   ├── WordResult.tsx
│   ├── MessageResult.tsx
│   ├── VersionSelector.tsx
│   └── ListenButton.tsx
│
├── lib/
│   ├── ai.ts
│   ├── validation.ts
│   ├── speech.ts
│   └── utils.ts
│
├── public/
│   └── ...
│
├── .dev.vars
├── wrangler.jsonc
├── package.json
└── tsconfig.json
```

This structure is a target architecture. It does not need to be implemented all at once.

---

# 23. Production Architecture

```text
                         ┌──────────────────┐
                         │      USER        │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   SAY IT RIGHT  │
                         │     WEBSITE     │
                         └────────┬─────────┘
                                  │
                     ┌────────────┴────────────┐
                     │                         │
                     ▼                         ▼
                WORD MODE                MESSAGE MODE
                     │                         │
                     └────────────┬────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │    /api/ai       │
                         │ Server Endpoint  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │   AI PROVIDER    │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Response Parser  │
                         │ + Validator      │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │      UI          │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
                  Copy          Listen       Regenerate
```

---

# 24. Security

## API key protection

```text
Browser ❌ API key
Server  ✅ API key
```

## Input limits

Recommended starting limits:

```text
Word:    100 characters
Message: 5,000 characters
```

## Rate limiting

Future production architecture:

```text
IP / session
      │
      ▼
Request counter
      │
      ▼
Limit exceeded?
   │        │
  No       Yes
   │        │
   ▼        ▼
  AI      Reject
```

Rate limiting becomes important once the site is publicly available.

---

# 25. Monetisation — Later Stage

Do not add monetisation until the core product is stable.

Recommended sequence:

```text
Website
   ↓
Reliable AI
   ↓
Good UX
   ↓
Users
   ↓
Usage data
   ↓
Monetisation
```

Possible future model:

## Free

```text
10–20 AI requests/day
```

## Pro

```text
Higher limits
More accents
More rewriting options
History
Saved phrases
```

Potential future pricing could be approximately:

```text
Free
$0

Pro
$5–10/month
```

Actual pricing should be decided after understanding AI costs and real user behaviour.

---

# 26. Future Features

## Phase 1 — MVP

```text
✅ Word Mode
✅ Message Mode
✅ 5 accents
✅ 5 message tones
✅ AI
✅ Listen
✅ Copy
✅ Regenerate
```

## Phase 2 — Polish

```text
□ Better animations
□ Loading states
□ Error handling
□ Mobile optimisation
□ SEO
□ Privacy
□ Terms
□ Analytics
```

## Phase 3 — Useful Features

```text
□ Search history
□ Favourite words
□ Saved messages
□ Pronunciation history
□ Share result
```

## Phase 4 — Advanced pronunciation

```text
□ Syllable breakdown
□ Stress indication
□ Slow pronunciation
□ Natural pronunciation
□ Male/female voice selection
□ Accent comparison
```

## Phase 5 — Mobile

```text
□ iPhone
□ Android
```

---

# 27. SEO Strategy

SEO could become a major source of organic traffic.

Potential searches:

```text
How to pronounce Maroubra
How to pronounce entrepreneur
How to pronounce schedule
How to pronounce Worcestershire
Australian pronunciation
British pronunciation
American pronunciation
```

Eventually the site could create indexable pages such as:

```text
/say/maroubra
/say/entrepreneur
/say/schedule
/say/worcestershire
```

This creates the potential for Google traffic from people searching for pronunciation help.

---

# 28. Long-Term Product Vision

The strongest version of the product is not simply:

> "An AI pronunciation website."

It becomes:

> **An AI communication assistant for speaking and writing better English.**

Two complementary products:

```text
              SAY IT RIGHT
                    │
          ┌─────────┴─────────┐
          │                   │
       SPEAK IT             WRITE IT
          │                   │
     Pronunciation          Rewriting
          │                   │
      Accents               Tones
          │                   │
       Meaning             Better wording
          │                   │
       Listen                Listen
```

This positioning is stronger than building only a pronunciation dictionary.

---

# 29. Immediate Development Priority

Given the current project status, do not add major new features yet.

Priority:

```text
1. Fix /api/ai reliability
          ↓
2. Fix Word Mode validation
          ↓
3. Test all 5 accents
          ↓
4. Test Message Mode
          ↓
5. Test Regenerate limit
          ↓
6. Test Listen
          ↓
7. Test production build
          ↓
8. Deploy to Cloudflare
          ↓
9. Test live website
          ↓
10. SEO + polish
```

The current **Maroubra → Australian works → British produces "invalid word response"** problem should be fixed before adding more functionality.

The next technical milestone should therefore be a **stable AI response contract** for both Word Mode and Message Mode.

---

# 30. Master Development Principle

Keep the product simple:

```text
User enters something
        ↓
User chooses Word or Message
        ↓
User chooses accent/tone
        ↓
Click "Say It Right"
        ↓
AI processes request
        ↓
Validated result
        ↓
User can Copy / Listen / Regenerate
```

Every future feature should be evaluated against one question:

> **Does this make it easier for the user to say it right or write it better?**

If not, it probably does not belong in the core product.
