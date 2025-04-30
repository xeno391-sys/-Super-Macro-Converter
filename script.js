const inputEl = document.getElementById('inputText');
const outputEl = document.getElementById('outputText');
const loadingEl = document.getElementById('loadingIndicator');
const convertButton = document.getElementById('convertButton');
const consoleCheckbox = document.getElementById('consoleCheckbox');
const historyList = document.getElementById('historyList');

const charMap = {
  ' ': '{Space}',
  '!': '{SHIFT}{1}',
  '@': '{SHIFT}{2}',
  '#': '{SHIFT}{3}',
  '$': '{SHIFT}{4}',
  '%': '{SHIFT}{5}',
  '^': '{SHIFT}{6}',
  '&': '{SHIFT}{7}',
  '*': '{SHIFT}{8}',
  '(': '{SHIFT}{9}',
  ')': '{SHIFT}{0}',
  '_': '{SHIFT}{-}',
  '+': '{SHIFT}{=}',
  '{': '{shift}{oem_4}',
  '}': '{shift}{oem_6}',
  ';': '{oem_1}',
  ':': '{shift}{oem_1}',
  '"': '{shift}{oem_7}',
  '<': '{SHIFT}{,}',
  '>': '{SHIFT}{.}',
  '?': '{shift}{oem_2}',
  '|': '{shift}{oem_5}',
  '/': '{oem_2}',
  '`': '{oem_3}',
  '~': '{shift}{oem_3}',
  '[': '{oem_4}',
  '\\': '{oem_5}',
  ']': '{oem_6}',
  '\n': '{Enter}'
};

let history = []; // Store the last 10 inputs and outputs

// Listen for changes in input to update button state
inputEl.addEventListener('input', updateButtonState);

function updateButtonState() {
  const text = inputEl.value.trim();
  console.log(`Input text detected: "${text}"`); // Debug Log
  convertButton.disabled = text === '';
}

function validateInput(text) {
  if (text.trim() === '') {
    inputEl.classList.add('input-error');
    outputEl.textContent = '⚠️ Please enter some text to convert.';
    return false;
  }
  inputEl.classList.remove('input-error');
  return true;
}

function generateMacro(text) {
  console.log(`Generating macro for: "${text}"`); // Debug Log
  let result = [];
  // Existing logic...
  return result.join('');
}

  result.push('{');

  for (let char of text) {
    if (charMap[char]) {
      result.push(charMap[char]);
    } else if (char >= 'A' && char <= 'Z') {
      result.push('{SHIFT}{' + char.toLowerCase() + '}');
    } else {
      result.push('{' + char + '}');
    }
  }

  result.push('}');

  if (consoleCheckbox.checked) {
    result.push('{Enter}'); // Add Enter for Ark command
  }

  return result.join('');
}

function convertText() {
  console.log('Convert button clicked!'); // Debugging log
  const text = inputEl.value;
  console.log(`Converting text: "${text}"`); // Debug Log

  if (!validateInput(text)) {
    console.log('Validation failed.'); // Debug Log
    return;
  }

  loadingEl.style.display = 'block'; // Show loading indicator
  const macro = generateMacro(text);
  console.log(`Generated macro: "${macro}"`); // Debug Log

  outputEl.textContent = macro;
  outputEl.style.display = macro ? 'block' : 'none'; // Toggle visibility
  console.log('Output field updated and visibility toggled.'); // Debug Log

  addHistoryItem(text, macro);
  loadingEl.style.display = 'none'; // Hide loading indicator
}

function addHistoryItem(input, output) {
  // Add to history and trim to the last 10 entries
  history.unshift({ input, output });
  if (history.length > 10) {
    history.pop();
  }

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = ''; // Clear the list

  history.forEach((entry, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('history-item');

    const header = document.createElement('div');
    header.classList.add('history-header');
    header.textContent = `Input: ${entry.input}`;

    const outputDiv = document.createElement('div');
    outputDiv.classList.add('history-output');
    outputDiv.textContent = entry.output;

    const copyBtn = document.createElement('button');
    copyBtn.classList.add('copy-history-btn');
    copyBtn.textContent = 'Copy';
    copyBtn.onclick = () => copyOutput(entry.output);

    listItem.appendChild(header);
    listItem.appendChild(outputDiv);
    listItem.appendChild(copyBtn);

    historyList.appendChild(listItem);
  });
}

function copyOutput(output) {
  navigator.clipboard.writeText(output)
    .then(() => alert('Output copied to clipboard!'))
    .catch(err => {
      console.error('Copy failed:', err);
      alert('Copy failed. Please try again.');
    });
}

function resetFields() {
  inputEl.value = '';
  outputEl.textContent = '';
  inputEl.classList.remove('input-error');
  updateButtonState();
}
