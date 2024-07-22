const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

export const generatePassword = (length, settings) => {
  let staticPassword = "";
  let randomPassword = "";
  const { lowercase, uppercase, numbers, symbols, excludeDuplicate, spaces } = settings;

  if (lowercase) staticPassword += characters.lowercase;
  if (uppercase) staticPassword += characters.uppercase;
  if (numbers) staticPassword += characters.numbers;
  if (symbols) staticPassword += characters.symbols;
  if (spaces) staticPassword += `  ${staticPassword}  `;

  for (let i = 0; i < length; i++) {
    let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      if (!randomPassword.includes(randomChar) || randomChar === " ") {
        randomPassword += randomChar;
      } else {
        i--;
      }
    } else {
      randomPassword += randomChar;
    }
  }
  return randomPassword;
};

export const updatePassIndicator = (length) => {
  return length <= 8 ? "weak" : length <= 16 ? "medium" : "strong";
};
