#!/bin/sh
# Netlify বিল্ডের সময় নিজে থেকে `public` ও `netlify/functions` ফোল্ডার বানিয়ে ফাইল সাজিয়ে দেয়।
# তাই GitHub-এ ফোল্ডার বানাতে হয় না — সব ফাইল একই জায়গায় (মূলে) আপলোড করলেই চলে।
set -e
mkdir -p public netlify/functions
# ফাইল মূলে থাকলে কপি করে নেয় (ফোল্ডারসহ আপলোড করলেও সমস্যা নেই)
for f in index.html app.js style.css; do [ -f "$f" ] && cp "$f" "public/$f"; done
[ -f api.mjs ] && cp api.mjs netlify/functions/api.mjs
for f in public/index.html public/app.js public/style.css netlify/functions/api.mjs; do
  if [ ! -f "$f" ]; then echo "ত্রুটি: $f পাওয়া যায়নি – সব ফাইল আপলোড হয়েছে কিনা দেখুন"; exit 1; fi
done
echo "ঠিক আছে: public ফোল্ডার ও ফাংশন তৈরি হয়েছে"
