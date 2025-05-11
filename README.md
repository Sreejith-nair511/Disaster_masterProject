# 🌪️ Disaster Prediction Platform

An advanced, responsive platform for predicting, visualizing, and managing natural disasters in real-time. Built using **Next.js**, **TypeScript**, and **Tailwind CSS**, this application features interactive modules like maps, emergency response, chatbot assistance, and predictive analysis.

---

## 🔥 Key Modules

- 📍 **Predictions** — Display AI-generated or data-driven disaster forecasts
- 🗺️ **Maps** — Interactive disaster map visualizations
- 🤖 **Chatbot** — Virtual assistant for emergency queries
- 🚨 **Emergency** — Access crucial emergency resources and procedures
- 📊 **Reports** — View or upload disaster reports and summaries

---

## 🛠️ Tech Stack

- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **pnpm** for fast package management
- **PostCSS** for styling workflows

---

## 📁 Folder Structure

disaster-prediction-platform/
├── app/
│ ├── page.tsx # Home page
│ ├── layout.tsx # Layout wrapper
│ ├── globals.css # Global styles
│ ├── predictions/ # Prediction module
│ ├── maps/ # Maps module
│ ├── chatbot/ # Chatbot module
│ ├── emergency/ # Emergency resources
│ └── reports/ # Disaster reports
├── components/
│ ├── theme-provider.tsx # Theme handling
│ ├── main-nav.tsx # Top navigation bar
│ ├── mode-toggle.tsx # Dark/light mode switch
│ └── user-nav.tsx # User dropdown UI
├── tailwind.config.ts # Tailwind config
├── postcss.config.mjs # PostCSS setup
├── next.config.mjs # Next.js configuration
├── tsconfig.json # TypeScript settings
├── package.json # Scripts and dependencies
├── pnpm-lock.yaml # pnpm lockfile
└── .gitignore

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/disaster-prediction-platform.git
cd disaster-prediction-platform
2. Install Dependencies
bash
Copy
Edit
pnpm install
3. Start Development Server
bash
Copy
Edit
pnpm dev
Visit http://localhost:3000 to start exploring.

🚀 Deploying to Vercel
Steps:
Push the code to GitHub

Log in at vercel.com

Click "New Project", select the repo

Choose:

Framework: Next.js

Install: pnpm install

Build: pnpm build

Output Directory: .next

Click Deploy 🚀

✅ To-Do & Enhancements (suggested)
🌩 Integrate AI/ML models for real-time predictions

🌐 Add live weather and satellite feeds

🧭 Use Mapbox or Leaflet for geo-visualizations

🧾 Connect to database (Firebase, Supabase, MongoDB) for report storage

🔐 Add authentication for user role-based dashboards

📄 License
This project is licensed under the MIT License.

🇮🇳 Made with pride for resilient disaster management and digital public good.
