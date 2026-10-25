# Thread & Trend – GitHub-এ আপলোডের জন্য প্রস্তুত

**এই ফোল্ডারের সব ফাইল** (কোনো ফোল্ডার বানাতে হবে না) GitHub রিপোজিটরিতে আপলোড করুন।
Netlify নিজে থেকে `public` ফোল্ডার ও সার্ভার-ফাংশনের ফোল্ডার বানিয়ে নেবে (`build.sh` সেটা করে)।

## ফাইলগুলো
| ফাইল | কাজ |
|---|---|
| index.html, app.js, style.css | ওয়েবসাইট |
| api.mjs | সার্ভার-কোড (লগইন, সংরক্ষণ, ছবি আপলোড) |
| netlify.toml | Netlify সেটিংস ও নিরাপত্তা হেডার |
| build.sh | `public` ফোল্ডার নিজে বানায় |
| package.json | প্রয়োজনীয় প্যাকেজের তালিকা |

## আপলোডের পর Netlify-তে
1. Netlify → রিপোজিটরি জুড়ুন (Build command ও Publish directory ফাঁকা বা যা-ই থাক, `netlify.toml` সেটা ঠিক করে নেবে)।
2. **Site configuration → Environment variables**-এ `ADMIN_PASSWORD` ও `SESSION_SECRET` বসান (Scopes-এ `Functions` টিক)। মান বানাতে আলাদা `generate-secrets.html` ফাইলটি ব্রাউজারে খুলুন।
3. **Deploys → Trigger deploy**।
4. `আপনার-সাইট/api/health` খুলে দুটোই `true` দেখুন।
5. সাইটে উপরে বাঁয়ে দোকানের নামে ৫ বার দ্রুত ট্যাপ করে লগইন করুন।

## সমস্যা হলে
Deploy log-এ "ঠিক আছে: public ফোল্ডার ও ফাংশন তৈরি হয়েছে" লেখা দেখা উচিত। "ত্রুটি: … পাওয়া যায়নি" এলে বোঝা যাবে কোন ফাইল আপলোড হয়নি।

## ⚠️ অ্যাডমিন পাসওয়ার্ড কোথায় বসাবেন (এটাই সবচেয়ে গুরুত্বপূর্ণ)
**পাসওয়ার্ড কোনো ফাইলের ভিতরে লেখা থাকে না।** এটা শুধু Netlify-র "Environment variables" নামের গোপন জায়গায় থাকে। কোডে লিখলে কাজ করবে না।

1. https://app.netlify.com খুলে আপনার সাইটে ঢুকুন।
2. বাঁ পাশের মেনুতে **Site configuration** চাপুন, তারপর **Environment variables**।
3. **Add a variable** (বা Add environment variable) চাপুন, তারপর **Add a single variable**।
4. **Key** ঘরে লিখুন: `ADMIN_PASSWORD` (বড় হাতের অক্ষরে, হুবহু)। **Value** ঘরে আপনার পছন্দের পাসওয়ার্ড (কমপক্ষে ১০ অক্ষর)। Scopes-এ **Functions** টিক থাকতে হবে। সংরক্ষণ করুন।
5. আবার **Add a variable** চেপে Key: `SESSION_SECRET`, Value: লম্বা এলোমেলো লেখা (কমপক্ষে ৩২ অক্ষর; `generate-secrets.html` থেকে নিতে পারেন)।
6. **Deploys** ট্যাবে গিয়ে **Trigger deploy → Deploy site** চাপুন। (এটা না করলে নতুন মান কাজ করে না।)
7. ডিপ্লয় শেষ হলে `আপনার-সাইট/api/health` খুলুন। `ADMIN_PASSWORD` ও `SESSION_SECRET` দুটোই `true` দেখাতে হবে।

**পাসওয়ার্ড বদলাতে:** ঠিক একই জায়গায় গিয়ে `ADMIN_PASSWORD`-এর Value বদলান এবং আবার Trigger deploy করুন। কোড বা GitHub-এ হাত দিতে হয় না।

**`generate-secrets.html` কী:** এটা শুধু এলোমেলো শক্ত লেখা বানিয়ে দেয়। সার্ভারের সঙ্গে এর কোনো যোগ নেই, এটা পাসওয়ার্ড বদলায় না। চাইলে নিজের পছন্দের পাসওয়ার্ড ব্যবহার করতে পারেন; ওই টুল না চালালেও চলবে।

**লগইনে ত্রুটি এলে:** "অ্যাডমিন পাসওয়ার্ড সার্ভারে সেট করা নেই" মানে `ADMIN_PASSWORD` বসানো হয়নি, বা বসানোর পর Trigger deploy করা হয়নি, বা Scopes-এ Functions টিক নেই। "ভুল পাসওয়ার্ড" মানে সার্ভার মানটা পেয়েছে কিন্তু আপনার লেখা মেলেনি।
