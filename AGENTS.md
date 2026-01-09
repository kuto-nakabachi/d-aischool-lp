# AI Agents Development Guide

This file is for AI coding assistants (Codex, Antigravity, etc.)

## Mandatory Rules - MUST FOLLOW

### 1. Never commit directly to `main` or `staging` branches

Always create a feature branch:
```bash
git checkout staging
git checkout -b feature/your-feature-name
```

### 2. Development Flow (strict order)

```
feature/* branch → staging branch → main branch
     ↓                  ↓               ↓
  Local dev         Xserver test    Production
```

### 3. Image paths must include basePath

```tsx
// CORRECT
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
<Image src={`${basePath}/images/example.png`} />

// WRONG - will not display in production
<Image src="/images/example.png" />
```

### 4. Never deploy to production without user permission

Do not merge to `main` branch without explicit user approval.

## Project Info

| Environment | URL | Branch |
|-------------|-----|--------|
| Local | http://localhost:3000 | feature/* |
| Staging | https://decentralizedpro.io/school/Nakabachi/ | staging |
| Production | Same URL | main |

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Build for production
```

## See CLAUDE.md for full details (Japanese)
