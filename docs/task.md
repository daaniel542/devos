# Project Community — Build Plan (task.md)

This document is the **source-of-truth execution plan** for building Project Community efficiently, safely, and without rework.  
The strategy prioritizes **vertical slices**, **early data correctness**, and **repeatable patterns**.

Assume:

- React Native + Expo
- Supabase already connected
- Environment variables are configured
- We are optimizing for long-term velocity, not speed hacks

---

## Core Principles (Read First)

1. **Vertical slices > horizontal layers**
   - Every feature should work end-to-end (DB → API → UI) before moving on.
2. **Database + RLS first**
   - UI should never assume permissions that the DB doesn’t enforce.
3. **One canonical pattern**
   - Each completed slice becomes the template for the next.
4. **Minimal schema, expandable later**
   - No speculative tables or fields.
5. **Security lives in Supabase, not the client**
   - Client logic assumes RLS is always on.

---

## Phase 0 — Foundations

### Task 0.1 — Environment & Repo Sanity

**Goal:** Ensure a stable base before writing real features.

- Verify project boots cleanly
- Confirm `.env` loading
- Create a single `supabaseClient.ts`
- Add a temporary “Supabase connection test” screen

**Exit criteria:**

- App runs without errors
- Supabase client initializes
- A basic query executes successfully

---

### Task 0.2 — Authentication (Minimum Viable)

**Goal:** Users can exist in the system.

- Email/password sign up
- Email/password sign in
- Session persistence
- Auth-aware navigation (logged in vs logged out)

**Exit criteria:**

- User can create an account
- Session persists on reload
- Logout works correctly

---

## Phase 1 — Data Model v1 (Core)

### Task 1.1 — Core Tables

**Goal:** Support personal journaling without overdesign.

Create tables:

#### `profiles`

- `id` (uuid, PK, matches auth.users.id)
- `username` (text, unique)
- `display_name` (text)
- `avatar_url` (text, nullable)
- `created_at` (timestamp)

#### `entries`

- `id` (uuid, PK)
- `user_id` (uuid, FK → profiles.id)
- `title` (text, nullable)
- `body` (text, required)
- `visibility` (text, default: `private`)
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Notes:**

- No groups yet
- No comments yet
- No likes yet

**Exit criteria:**

- Tables exist
- Constraints and indexes are correct

---

### Task 1.2 — Row Level Security (RLS v1)

**Goal:** Enforce ownership at the database layer.

Policies:

- `profiles`: users can read/update their own profile
- `entries`: users can CRUD their own entries only

**Exit criteria:**

- RLS enabled
- App still works with RLS ON
- Users cannot read or modify other users’ data

---

## Phase 2 — First Vertical Slice: Personal Journal

### Task 2.1 — Create Entry

**Goal:** User can write and save a journal entry.

- Title input (optional)
- Body input (required)
- Save button
- Loading + error handling

**Exit criteria:**

- Entry successfully saves to DB
- Entry linked to authenticated user

---

### Task 2.2 — My Entries List

**Goal:** User can see their journal history.

- Fetch entries for current user
- Sort newest → oldest
- Tap to open entry detail

**Exit criteria:**

- List reflects DB state
- No leakage across users

---

### Task 2.3 — Entry Detail / Edit / Delete

**Goal:** Complete CRUD loop.

- View full entry
- Edit entry
- Delete entry with confirmation

**Exit criteria:**

- Update modifies `updated_at`
- Delete removes entry permanently
- RLS still enforced

---

## Phase 3 — Community Basics

### Task 3.1 — Likes

**Goal:** Lightweight engagement.

Create table:

- `entry_likes`
  - `entry_id`
  - `user_id`
  - `created_at`

Policies:

- User can like/unlike entries they can read

UI:

- Like button
- Like count

---

### Task 3.2 — Comments (No Replies Yet)

**Goal:** Discussion layer.

Create table:

- `comments`
  - `id`
  - `entry_id`
  - `user_id`
  - `body`
  - `created_at`

Policies:

- Users can comment on readable entries
- Users can delete their own comments

UI:

- Comments list
- Add comment input

---

## Phase 4 — Groups & Invite Links

### Task 4.1 — Groups & Membership

**Goal:** Shared journaling.

Tables:

- `groups`
  - `id`
  - `name`
  - `owner_id`
  - `created_at`

- `group_members`
  - `group_id`
  - `user_id`
  - `role`
  - `created_at`

Policies:

- Only members can read group entries
- Owner manages membership

UI:

- Create group
- View members
- Group feed (entries with `visibility = group`)

---

### Task 4.2 — Invite Links (Trusted Layer)

**Goal:** Controlled group access.

- Generate invite tokens
- Validate token
- Join group on success

Implementation:

- Supabase Edge Function or equivalent trusted service

---

## Phase 5 — Engagement Systems

### Task 5.1 — Notifications

**Goal:** User awareness.

Table:

- `notifications`
  - `id`
  - `user_id`
  - `type`
  - `actor_id`
  - `entity_id`
  - `read_at`
  - `created_at`

Triggers:

- Likes
- Comments
- Group joins

---

### Task 5.2 — Posting Streaks

**Goal:** Habit reinforcement.

Approach (v1):

- Compute streak dynamically from entry timestamps

Later:

- Cache or materialize if needed

---

## Execution Pattern (Use This Every Time)

For **every task**:

1. Database change
2. RLS policies
3. Type definitions
4. Supabase query helpers
5. UI screen
6. Loading + error states
7. Manual test checklist

---

## Immediate Next Tasks (Start Here)

1. Finish Auth flow
2. Create `profiles` + `entries` tables
3. Enable RLS + policies
4. Build Create Entry + My Entries screens

Once this slice is solid, all future features become incremental instead of risky.

---
