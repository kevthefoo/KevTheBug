---
title: GitHub API Test - Production CRUD
date: '2026-02-17'
excerpt: Testing that blog CRUD now commits directly to the GitHub repo.
tags:
  - GitHub API
readTime: 3 min read
coverImage: null
---
## Production CRUD Test

This post was created via the **SEO King Content Management** tool.

It commits directly to the GitHub repo using the GitHub Contents API, which means:

- No local file system needed
- Vercel auto-deploys on push
- Changes go live automatically

### How It Works
1. SEO King calls GitHub API to create/update/delete files
2. GitHub accepts the commit on the main branch
3. Vercel detects the push and redeploys

Pretty cool right?
