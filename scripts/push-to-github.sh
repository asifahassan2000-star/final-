#!/usr/bin/env bash
# ==============================================================================
# UCP Bahawalpur Campus - Push to GitHub Automation Script
# ==============================================================================

set -e

REPO_URL="https://github.com/asifahassan2000-star/ucp-bahwalpur-website-.git"

echo "=========================================================="
echo " University of Central Punjab (UCP) Bahawalpur Website"
echo " GitHub Push Assistant"
echo "=========================================================="
echo ""
echo "Target Repository: $REPO_URL"
echo ""

# Increase HTTP post buffer for large multimedia assets
git config http.postBuffer 524288000
git config pack.windowMemory 256m

# Ensure we are on branch main
git branch -M main

# If a token is passed as argument or environment variable
if [ -n "$1" ]; then
  TOKEN="$1"
elif [ -n "$GITHUB_TOKEN" ]; then
  TOKEN="$GITHUB_TOKEN"
else
  echo "GitHub requires a Personal Access Token (classic with 'repo' scope)."
  echo "Generate one at: https://github.com/settings/tokens"
  echo ""
  read -sp "Enter your GitHub Personal Access Token (input hidden): " TOKEN
  echo ""
fi

if [ -z "$TOKEN" ]; then
  echo "Error: Token cannot be empty."
  exit 1
fi

echo "Pushing code to $REPO_URL on branch 'main'..."
git push "https://${TOKEN}@github.com/asifahassan2000-star/ucp-bahwalpur-website-.git" main --force

echo ""
echo "SUCCESS! Website code pushed successfully to GitHub."
echo "Repository: https://github.com/asifahassan2000-star/ucp-bahwalpur-website-"
