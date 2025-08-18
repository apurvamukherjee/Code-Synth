# 🎹 Code Synth(under construction)

> A playful web app that turns your code into music in real-time. Where logic meets harmony.
Ever looked at a block of code and thought, "What would this sound like?" No? Well, now you can!
I built Code Synth to explore the fascinating intersection of software engineering and music. It’s more than just a toy—it's a real-time musical instrument that translates the structure of your code into melody, rhythm, and harmony. It's a fun, creative way to see and hear your code in a whole new light.

- Real-Time Synthesis: The music plays as you type. Watch your code come to life, one note at a time.
- Adjustable Controls: Tweak the tempo, change the key, and switch between different instruments to find the perfect sound for your code.
- Gemini Integration: Not sure what to code? Just type a prompt like "create a Python function for a factorial" and let Gemini generate the code for you.
- Structural Harmony: The notes and chords you hear aren't random! They are directly influenced by your code's structure, like how nested your `if/else` statements are or how long your lines are.

#last song i played was

> function generateMelodyPhrase(n) {
  const phrases = [
    "The single note, a held breath.",
    "The quiet echo, a whispered thought."
  ];

  if (n <= 1) {
    return phrases[n];
  }

  const prevPhrase1 = generateMelodyPhrase(n - 1);
  const prevPhrase2 = generateMelodyPhrase(n - 2);

  const parts1 = prevPhrase1.split(',').map(s => s.trim());
  const parts2 = prevPhrase2.split(',').map(s => s.trim());

  let newPhrase = "";
  if (parts1.length > 1 && parts2.length > 1) {
    newPhrase = `${parts1[1]}, ${parts2[0]}, ${parts1[0]} that is meant to last.`;
  } else {

    newPhrase = `${prevPhrase1.split(',')[0]}, ${prevPhrase2.split(',')[0]} and holds it fast.`;
  }
  
  return newPhrase;
}

for (let i = 0; i < 8; i++) {
  console.log(`\n**${i}**\n${generateMelodyPhrase(i)}`);
}
