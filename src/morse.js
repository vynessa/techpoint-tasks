const MORSE_CODE = {
  '-.-.--': '!',
  '.-..-.': '"',
  '...-..-': '$',
  '.-...': '&',
  '.----.': "'",
  '-.--.': '(',
  '-.--.-': ')',
  '.-.-.': '+',
  '--..--': ',',
  '-....-': '-',
  '.-.-.-': '.',
  '-..-.': '/',
  '-----': '0',
  '.----': '1',
  '..---': '2',
  '...--': '3',
  '....-': '4',
  '.....': '5',
  '-....': '6',
  '--...': '7',
  '---..': '8',
  '----.': '9',
  '---...': ':',
  '-.-.-.': ';',
  '-...-': '=',
  '..--..': '?',
  '.--.-.': '@',
  '.-': 'A',
  '-...': 'B',
  '-.-.': 'C',
  '-..': 'D',
  '.': 'E',
  '..-.': 'F',
  '--.': 'G',
  '....': 'H',
  '..': 'I',
  '.---': 'J',
  '-.-': 'K',
  '.-..': 'L',
  '--': 'M',
  '-.': 'N',
  '---': 'O',
  '.--.': 'P',
  '--.-': 'Q',
  '.-.': 'R',
  '...': 'S',
  '-': 'T',
  '..-': 'U',
  '...-': 'V',
  '.--': 'W',
  '-..-': 'X',
  '-.--': 'Y',
  '--..': 'Z',
  '..--.-': '_',
  '...---...': 'SOS',
};

Object.freeze(MORSE_CODE);

/**
 * This is the entry point to the program.
 *
 * @param {string} morseCode The string to decode.
 */
const decodeMorse = (morseCode) => {
  // Your code should go here.
  let result = ""
  const splitMorseString = morseCode.split(" ")
  for (i = 0; i < splitMorseString.length; i++) {
    result += MORSE_CODE[`${splitMorseString[i]}`]
  }

  return result
}

module.exports = decodeMorse;
