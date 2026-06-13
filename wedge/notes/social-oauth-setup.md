# Connecting socials to Postiz — Instagram + LinkedIn setup walk

Operational notes for wiring Postiz to the two channels we post to
(`marketing/channels.md`: X + LinkedIn build-in-public, IG @celabe / @carsonrodrigues).

**Ground rules**
- Credentials are Carson's — the agent never touches login or types passwords.
- App ID / App Secret / tokens go into the **Postiz env locally** — **never** into
  the repo (`.env` is gitignored; keep it that way).
- Nothing is submitted on any screen without Carson's explicit go.

---

## Meta / Instagram (~10 min)

1. **Log in** at Meta for Developers → "Continue with Facebook", using the
   Facebook account that owns the Instagram (`@carsonrodrigues` must be linked to
   it, or to a Page you admin).
2. **Create app** → use case **"Other"** → type **"Business"** → name it
   **`content-engine`** (agent fills the form; Carson approves the create click).
3. **Add the Instagram product** → **"API setup with Instagram login"**.
4. **Convert the IG account to Professional** if it isn't already (free, in the
   IG app or web).
5. **Connect the IG account** as the app's tester/admin → **generate the
   long-lived access token**.
6. **Copy** App ID, App Secret, and the token into the Postiz env (locally).

## LinkedIn (~5 min)

1. **linkedin.com/developers** → **Create app** (requires a LinkedIn Page you
   admin — the **Celabe page** works).
2. **Add the "Share on LinkedIn" product** (self-serve, no review).
3. **Grab Client ID + Secret** → Postiz env → **OAuth once** to authorize
   `w_member_social`.

---

## Env keys these produce (set locally in Postiz, never commit)

| Key | From |
|---|---|
| `INSTAGRAM_APP_ID` / `INSTAGRAM_APP_SECRET` | Meta app → Instagram product |
| Instagram long-lived access token | Meta step 5 |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | LinkedIn app |

(Check Postiz's own `.env` docs for the exact variable names it expects per
provider — these may differ slightly from the labels above.)
