# StartupLens Fine-Tuning Pipeline

If you want to create a custom AI model that strictly adheres to your specific VC logic and analysis style, you must provide it with a training dataset. This process is called **Fine-Tuning**.

This folder contains a utility script that compiles your manual examples into a `.jsonl` format required by Google AI Studio.

## Step 1: Create your `dataset.json`
Create a new file in this folder named `dataset.json`. It should be an array of objects. You need at least **20-50 examples** for the tuning to be effective.

### Example Format:
```json
[
  {
    "idea": "A B2B SaaS platform for automating compliance in Indian fintechs.",
    "industry": "FinTech",
    "traction": "Building MVP",
    "unfairAdvantage": "I worked as a compliance officer at Paytm for 4 years.",
    "vc_analysis": {
      "startupSummary": "A regulatory technology platform...",
      "problemScore": {
        "score": 8,
        "verdict": "Good",
        "reasoning": "RBI compliance is incredibly stringent..."
      }
      // ... include ALL fields required by the dashboard JSON schema
    }
  }
]
```

## Step 2: Run the Generator
Once you have written your 50 perfect examples in `dataset.json`, open your terminal and run:

```bash
node scripts/generate-dataset.js
```

## Step 3: Upload to Google AI Studio
1. The script will generate a file called `tuning-dataset.jsonl`.
2. Go to [Google AI Studio > Tuned Models](https://aistudio.google.com/app/tuned_models).
3. Click "Create Tuned Model".
4. Upload `tuning-dataset.jsonl` as your training data.
5. Wait a few hours for Google to train the model.
6. Once finished, copy your custom model's name (e.g., `models/roodraksh-vc-tuned`) and replace `gemini-3.5-flash` with it inside `src/services/ai/gemini.js`.
