# UI / UX Design Principles — Bible Devotional & Community App

## Design Philosophy

This app is **content-first**. The UI must never compete with scripture, reflection, or silence.

> Design goal: Zero friction to **read → reflect → write → share (optional)**

If users notice the UI before the content, the design has failed.

---

## Core UX Principles (Non-Negotiable)

### 1. Content > UI

- Scripture and reflections are the focus
- UI elements should disappear when not needed
- Avoid visual noise, badges, excessive icons, or bright accents

### 2. One Screen = One Intention

Every screen should answer:
> “What is the user meant to do right now?”

Examples:

- Read today’s scripture
- Write a reflection
- Read a friend’s reflection

Never mix more than **one primary action** per screen.

### 3. Progressive Disclosure

- Do not expose all features at once
- Community, reactions, streaks, and sharing are **secondary**
- Private reflection comes before public sharing

---

## Navigation Structure

Bottom tab bar (max 4 items):

1. Home (Daily Reading)
2. Journal
3. Community
4. Profile

Rules:

- No hamburger menus unless unavoidable
- No nested navigation for core flows
- Reading mode hides navigation entirely

---

## Screen-Level UX Guidelines

### Home (Daily Focus)

Purpose: Get the user reading in under 3 seconds.

Layout:

- Date + “Today’s Reading”
- Scripture excerpt (large, centered)
- One primary CTA: **Reflect**

Avoid dashboards, stats, or multiple CTAs.

---

### Reading View

This is sacred space.

Rules:

- Full-screen reading
- No visible tabs or distractions
- Tap once to reveal controls, tap again to hide
- Centered text column with generous margins

Typography:

- Comfortable line length (60–70 chars)
- Generous line height
- Serif or humanist sans-serif preferred

---

### Reflection / Journal

Should feel **private, calm, and safe**.

Rules:

- Full-screen text input
- No character limits
- Auto-save by default
- Sharing is optional and secondary

Prompt example:
> “What stood out to you today?”

No visible metrics, likes, or validation loops.

---

### Community Feed

Tone: Thoughtful, restrained, respectful.

Layout:

- Vertical card list
- Scripture reference
- Short reflection preview
- Author info (subtle)
- “Read more” action

Avoid:

- Infinite scroll dopamine loops
- Large reaction counts
- Bright badges or aggressive gamification

---

### Notifications

- Silent by default
- Batched and minimal
- Informational, not attention-seeking
- No excessive red indicators

---

## Visual Design System

### Color Palette

- Warm off-white / parchment tones
- Soft grays
- Muted blues or greens
- One accent color maximum

Avoid:

- Pure black backgrounds
- Neon or saturated colors
- Multiple competing accents

---

### Components

- Rounded cards (8–12px radius)
- Soft shadows or none
- Dividers preferred over borders
- Minimal iconography

---

### Motion & Animation

- Subtle only
- 150–250ms transitions
- Fade + slight translate
- No bounce or aggressive spring animations

Motion should feel calm, intentional, and invisible.

---

## UX Anti-Patterns to Avoid

- Overloaded dashboards
- Social-media-style engagement mechanics
- Loud notifications
- Visual clutter
- Forcing community interaction
- Making reflection feel performative

---

## Design North Star

> This app should feel like opening a quiet notebook — not scrolling a platform.

Every UI decision should be justified by:

- Does this reduce friction?
- Does this respect silence and focus?
- Does this serve the content first?

If not, remove it.
