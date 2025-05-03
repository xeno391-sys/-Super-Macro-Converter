export class MacroConverter {
  constructor(charMap) {
    this.charMap = charMap;
  }

  convert(text) {
    const unsupported = [];
    const result = ["{{"];
    for (let char of text) {
      if (this.charMap[char]) {
        result.push(this.charMap[char]);
      } else if (/^[a-zA-Z]$/.test(char) || /^[ -~]$/.test(char)) {
        result.push("{" + char + "}");
      } else {
        unsupported.push(char);
      }
    }
    result.push("}}");
    return { macro: result.join(""), unsupported };
  }
}
