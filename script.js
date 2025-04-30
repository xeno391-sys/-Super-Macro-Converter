const inputEl = document.getElementById('inputText');
const outputEl = document.getElementById('outputText');
const loadingEl = document.getElementById('loadingIndicator');
const convertButton = document.getElementById('convertButton');
const consoleCheckbox = document.getElementById('consoleCheckbox');

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

// Listen for changes in input to update button state
inputEl.addEventListener('input', updateButtonState);

function updateButtonState() {
  const text = inputEl.value.trim();
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
  let result = [];

  if (consoleCheckbox.checked) {
    result.push('{shift}{oem_3}'); // Add tilde for Ark console
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
  const text = inputEl.value;

  if (!validateInput(text)) {
    return;
  }

  loadingEl.style.display = 'block'; // Show loading indicator

  const macro = generateMacro(text);
  outputEl.textContent = macro;

  loadingEl.style.display = 'none'; // Hide loading indicator
}

function copyToClipboard() {
  const text = outputEl.textContent;
  if (!text || text.startsWith('⚠️')) return;
  navigator.clipboard.writeText(text)
    .then(() => alert('Macro copied to clipboard!'))
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
