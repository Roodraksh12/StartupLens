const fs = require('fs');
const path = require('path');

// 1. Read the input dataset
const inputPath = path.join(__dirname, 'dataset.json');
const outputPath = path.join(__dirname, 'tuning-dataset.jsonl');

console.log('🚀 Starting StartupLens Dataset Generator...');

if (!fs.existsSync(inputPath)) {
  console.error('❌ Error: dataset.json not found in the scripts folder.');
  console.log('Please create dataset.json based on the instructions in README.md');
  process.exit(1);
}

const rawData = fs.readFileSync(inputPath, 'utf8');
let dataset;
try {
  dataset = JSON.parse(rawData);
} catch (err) {
  console.error('❌ Error: dataset.json is not valid JSON.', err.message);
  process.exit(1);
}

if (!Array.isArray(dataset)) {
  console.error('❌ Error: dataset.json must be an array of objects.');
  process.exit(1);
}

// 2. Convert to Google AI Studio JSONL format
let jsonlContent = '';
let processedCount = 0;

dataset.forEach((entry, index) => {
  if (!entry.idea || !entry.vc_analysis) {
    console.warn(`⚠️ Warning: Skipping entry at index ${index} due to missing 'idea' or 'vc_analysis'`);
    return;
  }

  // Construct the prompt exactly how the app constructs it
  const text_input = `Startup Idea: ${entry.idea}
Startup Name: ${entry.name || "Not provided"}
Industry: ${entry.industry || "Not provided"}
Target Users: ${entry.targetUsers || "Not provided"}
Business Model: ${entry.businessModel || "Not provided"}
Current Traction: ${entry.traction || "Idea Stage"}
Unfair Advantage: ${entry.unfairAdvantage || "Not provided"}
Additional Context: ${entry.context || "None"}`;

  // The output must be the stringified JSON of the VC analysis
  const output = JSON.stringify(entry.vc_analysis);

  // Google AI Studio Tuning Format
  const tuningRow = {
    text_input: text_input,
    output: output
  };

  jsonlContent += JSON.stringify(tuningRow) + '\n';
  processedCount++;
});

// 3. Save the JSONL file
fs.writeFileSync(outputPath, jsonlContent.trim(), 'utf8');
console.log(`✅ Success! Processed ${processedCount} entries.`);
console.log(`📁 File generated at: ${outputPath}`);
console.log('You can now upload this .jsonl file to Google AI Studio to fine-tune your model!');
