# StartupLens - AI Startup Evaluator

![StartupLens Banner](https://via.placeholder.com/1200x400/080d1a/ffffff?text=StartupLens+AI)

StartupLens is a lightning-fast, highly analytical AI-powered Startup Evaluator. It is engineered to act as a Tier-1 Venture Capitalist, providing founders with brutally honest, data-backed feedback on their startup ideas before they write a single line of code.

By enforcing strict JSON-mode reasoning using the latest Google Gemini models, StartupLens generates structured, actionable dashboards containing Market Analysis, Competitor Mapping, Go-To-Market strategies, and MVP Roadmaps.

## 🚀 Features

- **Brutal VC Persona:** Evaluates ideas with extreme depth, identifying fundamental unit economic flaws and existential risks.
- **Structured Dashboard:** Transforms complex AI analysis into beautiful, readable UI components (Gauges, SWOT grids, Progress bars).
- **Zero Prompt Engineering:** Founders simply input their core idea and target market. The platform handles the complex 500+ word Few-Shot Prompting under the hood.
- **Apples-to-Apples Comparison:** Every idea is evaluated against the exact same 15-point criteria for fair comparison.
- **Glassmorphism UI:** Built with Tailwind CSS v4 featuring modern gradients, blurs, and framer-motion animations.
- **Serverless Architecture:** A pure frontend React application that hits the Gemini API directly.

## 🛠️ Tech Stack

- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI Engine:** Google Gemini SDK (`@google/genai` using `gemini-3.5-flash`)

## 🏗️ Architecture

This project follows a Feature-Based Architecture for scalable frontend development:

```
src/
├── features/
│   ├── startup-form/      # Idea input and validation logic
│   └── dashboard/         # Results rendering (SWOT, Competitors, GTM)
├── shared/
│   ├── components/        # Reusable UI (Header, Loaders)
│   ├── hooks/             # Custom React hooks
│   └── utils/             # Helper functions
├── services/
│   └── ai/
│       └── gemini.js      # Core AI logic, Prompts, and RAG Integration
└── App.jsx                # Main state container
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/startuplens.git
   cd startuplens
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Google Gemini API Key (get it free from [Google AI Studio](https://aistudio.google.com/)).
   ```env
   VITE_GEMINI_API_KEY="your_api_key_here"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 🧠 The AI Prompt Engineering Strategy

This application does not use basic chatbot queries. It uses **In-Context Learning (Few-Shot Prompting)** and **Chain of Thought** reasoning. The AI is explicitly forced to:
1. Deconstruct the core value proposition.
2. Identify the single biggest fatal flaw in the business model.
3. Map out the competitive landscape.
4. Formulate non-obvious pivot strategies.
5. Return strictly validated JSON mapping directly to the React component states.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
If you want to integrate an external Vector Database for custom RAG, please open an issue first to discuss the architecture.

## 📄 License

This project is licensed under the MIT License.
