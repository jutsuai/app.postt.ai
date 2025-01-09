// One-line function to generate a random 24-character word
export default function generateRandomWord(wordLength = 24): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomWord = "";

  // Use the current timestamp as a seed
  const timestamp = Date.now().toString();

  for (let i = 0; i < wordLength; i++) {
    // Create a pseudo-random index based on the timestamp and iteration
    const index =
      (parseInt(timestamp[i % timestamp.length], 10) + Math.random() * 1000) %
      alphabet.length;
    randomWord += alphabet[Math.floor(index)];
  }

  return randomWord;
}
