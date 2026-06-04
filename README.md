# 🚀 StartupLens - AI Startup Evaluator

Welcome to **StartupLens**! This is a lightning-fast, highly intelligent web application that acts like a brutal, top-tier Venture Capitalist (VC). 

Before you spend months building a startup, simply type your idea into this app. It will use advanced AI to analyze your idea, find its flaws, research your competitors, and give you a detailed step-by-step roadmap to launch it successfully.

![StartupLens Preview](https://via.placeholder.com/1200x400/080d1a/ffffff?text=StartupLens+AI)

---

## ✨ What does it do? (Features)

Instead of just chatting with a bot, this app provides a beautifully designed dashboard with real startup metrics:

1. **🔥 Brutal Problem Validation:** It scores how "painful" the problem you are solving actually is.
2. **📈 Market Sizing:** It estimates the Total Addressable Market (TAM) for your industry.
3. **⚔️ Competitor Analysis:** It lists real competitors and tells you exactly what their weaknesses are.
4. **💰 Monetization Ideas:** It gives you 3 different ways to make money from your idea.
5. **🗺️ MVP Roadmap:** It generates a strict 6-month plan to build your first prototype.
6. **📊 SWOT Analysis:** A full breakdown of your Strengths, Weaknesses, Opportunities, and Threats.

---

## 🛠️ How does it work under the hood?

This project is built using modern web technologies and advanced AI techniques:

* **React & Vite:** Makes the app incredibly fast and responsive.
* **Tailwind CSS v4:** Gives the app that beautiful, dark "Glassmorphism" look with glowing gradients.
* **Google Gemini 3.5 Flash:** The brain of the operation. We use Google's latest AI model for blazing-fast reasoning.

### 🧠 The Secret Sauce: RAG & Few-Shot Prompting
We don't just ask the AI a simple question. We use a massive 500-word "System Prompt" that forces the AI to adopt the persona of a brutal VC. Furthermore, the app uses **RAG (Retrieval-Augmented Generation) via Google Search Grounding**. This means the AI actually browses the live internet in the background to pull real-time competitor data and market sizes before it gives you an answer!

---

## 💻 How to run this on your own computer

It is incredibly easy to get this running locally. Just follow these steps:

### Step 1: Clone the code
Open your terminal and download the code:
```bash
git clone https://github.com/yourusername/StartupLens.git
cd StartupLens
```

### Step 2: Install dependencies
Install all the required packages:
```bash
npm install
```

### Step 3: Add your AI Brain (API Key)
You need a free Google Gemini API key for the AI to work.
1. Go to [Google AI Studio](https://aistudio.google.com/) and get a free API key.
2. Create a file named `.env` in the root folder of this project.
3. Add this line to the file, replacing the text with your actual key:
```env
VITE_GEMINI_API_KEY="your_actual_api_key_here"
```

### Step 4: Start the app!
Run the development server:
```bash
npm run dev
```
Open the link it gives you (usually `http://localhost:5173`) in your browser, and start evaluating your startup ideas!

---

## 📁 Project Structure (For Developers)

If you want to edit the code, here is how the folders are organized:
* `src/features/` - Contains the forms and dashboard components.
* `src/shared/` - Contains UI elements used everywhere (like the Header).
* `src/services/ai/gemini.js` - **This is where the magic happens!** You can edit the AI Prompt and logic here.

---

## 🤝 Contributing
Want to make StartupLens even better? Feel free to fork the repository and submit a Pull Request!

## 📄 License
This project is open-source and free to use under the MIT License.
