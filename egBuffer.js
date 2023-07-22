// Creating a Buffer from a string
const str = 'Hello, World!';
const bufferFromString = Buffer.from(str);

console.log(bufferFromString); // Output: <Buffer 48 65 6c 6c 6f 2c 20 57 6f 72 6c 64 21>

// Creating a Buffer from an array of numbers
const numbers = [10, 20, 30, 40, 50];
const bufferFromNumbers = Buffer.from(numbers);

console.log(bufferFromNumbers); // Output: <Buffer 0a 14 1e 28 32>

// Creating a Buffer with a specific size and filling it with zeros
const bufferSize = 8;
const bufferWithZeros = Buffer.alloc(bufferSize);

console.log(bufferWithZeros); // Output: <Buffer 00 00 00 00 00 00 00 00>

// Modifying values in a Buffer
bufferWithZeros[0] = 255;
bufferWithZeros[3] = 127;

console.log(bufferWithZeros); // Output: <Buffer ff 00 00 7f 00 00 00 00>

// Converting a Buffer to a string
const bufferToConvert = Buffer.from('Hello, Buffer!');
const convertedString = bufferToConvert.toString();

console.log(convertedString); // Output: Hello, Buffer!
