const inputEl = document.getElementById('inputText');
const loadingEl = document.getElementById('loadingIndicator');
const convertButton = document.getElementById('convertButton');
const consoleCheckbox = document.getElementById('consoleCheckbox');
const historyList = document.getElementById('historyList');

const charMap = {
  ' ': '{Space}',
  '!': '{shift}{1}',
  '@': '{shift}{2}',
  '#': '{shift}{3}',
  '$': '{shift}{4}',
  '%': '{shift}{5}',
  '^': '{shift}{6}',
  '&': '{shift}{7}',
  '*': '{shift}{8}',
  '(': '{shift}{9}',
  ')': '{shift}{0}',
  '_': '{shift}{-}',
  '+': '{shift}{=}',
  '{': '{shift}{oem_4}',
  '}': '{shift}{oem_6}',
  ';': '{oem_1}',
  ':': '{shift}{oem_1}',
  '"': '{shift}{oem_7}',
  '<': '{shift}{,}',
  '>': '{shift}{.}',
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
    alert('⚠️ Please enter some text to convert.');
    return false;
  }
  inputEl.classList.remove('input-error');
  return true;
}

function generateMacro(text) {
  console.log(`Generating macro for: "${text}"`); // Debug Log
  let result = [];

  if (consoleCheckbox.checked) {
    result.push('{shift}{oem_3}'); // Add tilde for Ark console
  }

  result.push('{');

  for (let char of text) {
    if (charMap[char]) {
      result.push(charMap[char]);
    } else if (char >= 'A' && char <= 'Z') {
      result.push('{shift}{' + char.toLowerCase() + '}');
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

  history.forEach((entry) => {
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
    copyBtn.onclick = () => copyOutput(entry.output, copyBtn); // Pass button reference

    listItem.appendChild(header);
    listItem.appendChild(outputDiv);
    listItem.appendChild(copyBtn);

    historyList.appendChild(listItem);
  });
}

function copyOutput(output, buttonElement) {
  if (!output) {
    console.error('No output to copy.');
    return;
  }

  navigator.clipboard.writeText(output)
    .then(() => {
      // Change button text to "Copied to clipboard"
      const originalText = buttonElement.textContent;
      buttonElement.textContent = 'Copied to clipboard';

      // Revert back to original text after 2 seconds
      setTimeout(() => {
        buttonElement.textContent = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy:', err);
    });
}

function resetFields() {
  inputEl.value = '';
  inputEl.classList.remove('input-error');
  updateButtonState();
}
