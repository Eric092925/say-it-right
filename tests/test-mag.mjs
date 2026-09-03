async function testMagnificent() {
  const res = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/magnificent");
  console.log("Status:", res.status);
  if (res.ok) {
    const json = await res.json();
    console.log("Def:", json[0]?.meanings?.[0]?.definitions?.[0]?.definition);
    console.log("Phonetic:", json[0]?.phonetic);
  }
}
testMagnificent();
