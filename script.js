import { charMap } from './charMap.js';
import { MacroConverter } from './MacroConverter.js';

const converter = new MacroConverter(charMap);

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputText");
  const output = document.getElementById("outputText");

  document.getElementById("convertButton").addEventListener("click", () => {
    const { macro, unsupported } = converter.convert(input.value);
    output.textContent = macro;
    if (unsupported.length) showWarning(unsupported);
  });
});

function showWarning(chars) {
  const warning = document.createElement("div");
  warning.className = "unsupported-warning";
  warning.textContent = `⚠ Unsupported: ${chars.join(" ")}`;
  document.body.appendChild(warning);
  setTimeout(() => warning.remove(), 4000);
}
