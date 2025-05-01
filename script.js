const inputEl = document.getElementById('inputText');
const loadingEl = document.getElementById('loadingIndicator');
const convertButton = document.getElementById('convertButton');
const consoleCheckbox = document.getElementById('consoleCheckbox');
const historyList = document.getElementById('historyList');

const charMap = {
// Standard characters
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

  // Top row digits
  '0': '{{VK_0}}',
  '1': '{{VK_1}}',
  '2': '{{VK_2}}',
  '3': '{{VK_3}}',
  '4': '{{VK_4}}',
  '5': '{{VK_5}}',
  '6': '{{VK_6}}',
  '7': '{{VK_7}}',
  '8': '{{VK_8}}',
  '9': '{{VK_9}}',

  // Numpad operators
  'Num*': '{{MULTIPLY}}',
  'Num+': '{{ADD}}',
  'Num-': '{{SUBTRACT}}',
  'Num.': '{{DECIMAL}}',
  'Num/': '{{DIVIDE}}',

  // Control keys
  'Backspace': '{{BACK}}',
  'Tab': '{{TAB}}',

  // Modifier keys
  'Shift': '{{SHIFT}}',
  'Ctrl': '{{CTRL}}',
  'Alt': '{{ALT}}',

  // Arrow keys
  'Up': '{{UP}}',
  'Down': '{{DOWN}}',
  'Left': '{{LEFT}}',
  'Right': '{{RIGHT}}',

  // Function keys (F1–F24)
  'F1': '{{f1}}',
  'F2': '{{f2}}',
  'F3': '{{f3}}',
  'F4': '{{f4}}',
  'F5': '{{f5}}',
  'F6': '{{f6}}',
  'F7': '{{f7}}',
  'F8': '{{f8}}',
  'F9': '{{f9}}',
  'F10': '{{f10}}',
  'F11': '{{f11}}',
  'F12': '{{f12}}',
  'F13': '{{f13}}',
  'F14': '{{f14}}',
  'F15': '{{f15}}',
  'F16': '{{f16}}',
  'F17': '{{f17}}',
  'F18': '{{f18}}',
  'F19': '{{f19}}',
  'F20': '{{f20}}',
  'F21': '{{f21}}',
  'F22': '{{f22}}',
  'F23': '{{f23}}',
  'F24': '{{f24}}',

  // Windows media/browser keys
  'Browser Back': '{{BROWSER_BACK}}',
  'Browser Forward': '{{BROWSER_FORWARD}}',
  'Browser Home': '{{BROWSER_HOME}}',
  'Browser Refresh': '{{BROWSER_REFRESH}}',
  'Browser Stop': '{{BROWSER_STOP}}',
  'Browser Search': '{{BROWSER_SEARCH}}',
  'Browser Favorites': '{{BROWSER_FAVORITES}}',
  'Next Track': '{{MEDIA_NEXT_TRACK}}',
  'Previous Track': '{{MEDIA_PREV_TRACK}}',
  'Play / Pause': '{{MEDIA_PLAY_PAUSE}}',
  'Stop': '{{MEDIA_STOP}}',
  'Volume Up': '{{VOLUME_UP}}',
  'Volume Down': '{{VOLUME_DOWN}}',
  'Mute': '{{VOLUME_MUTE}}'
};

const macroTemplates = {
  // 🛑 Requires user input (XXXX, YYYY, ZZZZ) to complete
  'Pause': '{{PAUSE:00}}',  // Default to .5 second
  'KeyPress (variables)': '{{KeyPress:$Var1:$Var2}}',
  'KeyDown': '{{KeyDown:F1}}',
  'KeyUp': '{{KeyUp:F1}}',
  'Mouse Save Position': '{{MSAVEPOS}}',
  'Mouse Load Position': '{{MLOADPOS}}'
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
    result.push('{{shift}{oem_3}}{{PAUSE:200}}'); // Add tilde for Ark console
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

function insertMacro(macro) {
  const input = document.getElementById('inputText');
  input.value += macro;
  input.dispatchEvent(new Event('input')); // Trigger reprocessing
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
