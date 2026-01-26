#!/bin/bash
# Deploy to Vercel via GitHub

cd "$(dirname "$0")"

MESSAGE="${1:-Update website}"

git add -A
git commit -m "$MESSAGE"
git push

echo ""
echo "✅ Pushed to GitHub! Vercel will auto-deploy in ~30 seconds."
echo "🌐 Live at: https://siesta7s.com"
