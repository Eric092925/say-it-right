# Say It Right — Phase 2 Blueprint
## Speaking Practice & Speaking Test

**Project:** Say It Right  
**Phase:** 2  
**Version:** 1.0  
**Status:** Development Specification  
**Primary Objective:** Add a practical Speaking function to Say It Right without breaking Phase 1.

---

# 1. Phase 2 Overview

Phase 2 adds a new **Speaking** function to Say It Right.

The purpose is to allow users to:

1. Listen to natural English.
2. Practise speaking by repeating supplied content.
3. Record their voice through the browser.
4. Receive a pronunciation accuracy score.
5. Receive a fluency score.
6. Receive an overall score.
7. Receive useful feedback.
8. Repeat exercises during Practice mode.
9. Complete a structured 10-question Speaking Test.

The feature should feel like a natural extension of Say It Right, not a separate application.

## Core proposition

> **Listen. Speak. Improve.**

The feature should work without requiring a user account.

---

# 2. Critical Scope Rules

## 2.1 Protect Phase 1

Phase 2 MUST NOT break existing Phase 1 functionality.

Before making changes, inspect the existing project and understand:

- Current page structure
- Existing components
- Existing styling
- Existing Word Mode
- Existing Message Mode
- Existing accent handling
- Existing `/api/ai`
- Existing environment variables
- Existing Vercel deployment
- Existing AI response handling

Reuse existing components and functionality where appropriate.

Do not rewrite working Phase 1 functionality unnecessarily.

---

# 3. Phase 2 Navigation

The main Say It Right interface should eventually contain:

- Word
- Message
- Speaking

The new Speaking function should have a dedicated interface while maintaining the existing Say It Right visual identity.

Suggested landing page:

# Speaking

Practice your English pronunciation and fluency.

[ Practice ] [ Test ]

Practice:
> Listen, speak, get feedback and try again.

Test:
> Complete a 10-question speaking assessment.

---

# 4. Supported Accents

Speaking supports exactly three English variants:

- Australian English — `en-AU`
- British English — `en-GB`
- American English — `en-US`

Canadian and New Zealand English should not be available in the Speaking interface.

The selected accent controls the reference pronunciation.

IMPORTANT:

Do NOT claim that the system can determine whether a user's accent is Australian, British or American.

The selected accent is the pronunciation reference, not an accent-rating system.

---

# 5. Difficulty Levels

Three user-facing levels:

- Beginner
- Intermediate
- Advanced

The interface should use these simple names.

CEFR levels may optionally be mapped internally, but are not required in the main interface.

---

# 6. Exercise Types

Phase 2 supports three exercise types.

## 6.1 Sentence

A single sentence.

Example:

> I'd like to make a reservation for two people tonight.

---

## 6.2 Conversation

A short scripted conversation.

Example:

**Staff:** Good morning. How can I help you?

**User:** I'd like to book a table for two tonight.

The user speaks only the lines assigned to the User.

The other speaker's lines can be listened to/read as reference.

This is NOT real-time AI conversation.

---

## 6.3 Passage

A short passage for connected speech.

Recommended lengths:

### Beginner
Approximately 30–50 words.

### Intermediate
Approximately 50–80 words.

### Advanced
Approximately 80–120 words.

Avoid unnecessarily long passages in the MVP.

---

# 7. Practice Mode

Practice is the learning mode.

The user can choose:

- 1 exercise
- 5 exercises
- 10 exercises

The user selects:

- Level
- Accent
- Topic
- Number of exercises

Practice supports:

- Sentences
- Conversations
- Passages

Practice allows unlimited retries.

---

# 8. Practice User Flow

## Step 1 — Select Practice

User chooses:

> Practice

---

## Step 2 — Select Level

Options:

- Beginner
- Intermediate
- Advanced

---

## Step 3 — Select Accent

Options:

- Australian
- British
- American

---

## Step 4 — Select Topic

Suggested topics:

- Daily Life
- Travel
- Food
- Shopping
- Work
- Business
- Social Conversation
- Interview

"All Topics" should also be available.

The topic list should remain relatively small in the MVP.

---

## Step 5 — Select Exercise Count

Options:

- 1
- 5
- 10

---

## Step 6 — Display Exercise

Display the target content clearly.

For example:

> I'd like to make a reservation for two people tonight.

For conversations, clearly distinguish speakers.

For passages, display the complete passage.

---

# 9. Listen Function

The user can press:

> 🔊 Listen

The website plays the reference pronunciation.

The selected accent should determine the reference voice where technically supported.

## Practice

The user may listen repeatedly.

There should be no artificial listening limit in Practice.

---

# 10. Speaking Function

The user presses:

> 🎙 Start Speaking

The browser requests microphone permission when necessary.

During recording:

> 🔴 Recording...

Button:

> Stop

The system must provide a clear manual Stop button.

Do not rely exclusively on automatic silence detection.

---

# 11. Practice Analysis

After the user stops speaking:

1. Recording is submitted.
2. Speech is analysed.
3. Pronunciation Accuracy is calculated.
4. Fluency is calculated.
5. Overall score is calculated.
6. Feedback is generated.
7. Result is displayed.

Example:

# 84 / 100

**Pronunciation Accuracy**  
88 / 100

**Fluency**  
80 / 100

> Good job! Your pronunciation was clear. Try to make your speech a little smoother.

Buttons:

- Listen Again
- Try Again
- Next Exercise

Also provide:

> See Feedback

for additional information.

---

# 12. Detailed Practice Feedback

Detailed feedback should remain concise and useful.

Example:

## Your Feedback

### Pronunciation Accuracy — 88

Most of the words were pronounced accurately.

### Fluency — 80

There were a few noticeable pauses.

### Suggested improvement

Try to maintain a smoother flow between phrases.

If the underlying speech technology reliably provides word-level information, the system may identify specific words or sections needing improvement.

IMPORTANT:

Do not invent pronunciation problems when the speech technology does not provide reliable evidence.

---

# 13. Practice Retry

Practice allows unlimited retry.

The user can:

> Try Again

The new attempt is analysed independently.

The interface may show the latest score.

Optionally, where useful, show:

> Previous: 78  
> New: 84

This is optional for MVP.

Do not overcomplicate the interface.

---

# 14. Speaking Test

Test mode is an assessment.

The test contains exactly:

> **10 questions**

The user selects:

- Beginner
- Intermediate
- Advanced
- Australian / British / American English

The test contains a mixture of:

- Sentences
- Conversations
- Passages

The exact distribution may vary.

The test should not contain ten identical exercise types.

---

# 15. Test Rules

Test mode must be stricter than Practice.

## Listening

The user may listen to the reference pronunciation:

> Maximum 2 times per question.

Example:

> Listen 1 of 2

After the second listen, disable the Listen button.

---

## Speaking

The user receives:

> One speaking attempt per question.

There is NO retry.

---

## Immediate Feedback

Do not show detailed feedback after each question.

After submission:

> Question 3 of 10

Then move to the next question.

This prevents Test from becoming a Practice session.

---

# 16. Test Flow

## Test Setup

Display:

> # Speaking Test
>
> Level: Intermediate  
> Accent: Australian  
> Questions: 10

Button:

> Start Test

---

## During Test

Display:

> Question 3 of 10

Then display the exercise.

The user may:

1. Listen up to two times.
2. Start speaking.
3. Submit.
4. Continue.

---

# 17. Test Completion

After question 10:

> Test Complete

Then calculate:

- Pronunciation Accuracy
- Fluency
- Overall

---

# 18. Test Result

Keep the first version simple.

Example:

# Speaking Test Result

## 84 / 100

| Category | Score |
|---|---:|
| Pronunciation Accuracy | 87 |
| Fluency | 81 |

Then show a short summary:

> Your pronunciation was strong overall. Work on speaking more smoothly and reducing pauses.

Button:

> Practice Again

Do not present this as an official language qualification.

Do NOT claim:

- IELTS equivalent
- TOEFL equivalent
- Official CEFR certification
- Native speaker rating
- Accent authenticity percentage

---

# 19. Scoring

Phase 2 has three visible scores:

1. Pronunciation Accuracy
2. Fluency
3. Overall

---

# 20. Pronunciation Accuracy

Pronunciation Accuracy measures how closely the user's speech matches the target content.

Possible signals include:

- Speech-to-text transcription
- Word matching
- Missing words
- Extra words
- Substituted words
- Pronunciation confidence metrics, if supplied by the speech provider
- Other reliable speech-analysis information

Use the most reliable available signals.

Do not create fake precision.

---

# 21. Fluency

Fluency measures speaking smoothness.

Possible signals:

- Long pauses
- Excessive hesitation
- Speech continuity
- Speaking rate where reliable
- Start/stop behaviour

The system should not claim to measure sophisticated linguistic fluency unless the selected technology can actually support it.

---

# 22. Overall Score

Initial scoring model:

> Overall = 60% Pronunciation Accuracy + 40% Fluency

Example:

Pronunciation Accuracy = 90

Fluency = 80

Overall:

> 86

The weights must be stored as configurable constants so they can be adjusted later.

Do not hard-code the formula in multiple places.

---

# 23. Scoring Reliability

Scoring must be conservative.

If the system cannot reliably analyse the recording, do not generate a misleading score.

Examples:

### No speech

> We couldn't detect your speech. Please try again.

### Excessive noise

> We couldn't hear your speech clearly. Please try again in a quieter place.

### Analysis failure

> We couldn't analyse your recording. Please try again.

A technical failure must NOT automatically become a pronunciation score of 0.

---

# 24. Microphone Permission

Microphone access should only be requested when the user begins speaking.

Handle:

- Permission granted
- Permission denied
- Browser unsupported
- Microphone unavailable

Example:

> Microphone access is required for speaking practice. Please allow microphone access and try again.

Do not record secretly.

---

# 25. Voice Recording

Preferred MVP architecture:

> Microphone
> ↓
> Temporary processing
> ↓
> Speech analysis
> ↓
> Score
> ↓
> Discard audio

Do not permanently store user voice recordings.

Do not build:

- Voice library
- Saved recordings
- Public recordings
- Audio profiles

---

# 26. Speech Technology

The coding agent should evaluate the most practical speech-analysis solution compatible with the current Vercel architecture.

Do NOT assume a specific provider.

Evaluate options based on:

1. Speech recognition accuracy
2. Pronunciation-analysis capabilities
3. Australian/British/American English support
4. Browser compatibility
5. Reliability
6. Cost
7. Latency
8. Privacy
9. Ease of Vercel deployment
10. Future extensibility

The coding agent should choose the most practical solution.

API keys MUST remain server-side.

Never expose provider secrets in browser code.

---

# 27. API Architecture

Reuse the existing server-side API architecture.

The coding agent should inspect the existing `/api/ai` implementation.

If speech analysis requires a separate endpoint, use a dedicated route such as:

```text
/api/speaking/analyse