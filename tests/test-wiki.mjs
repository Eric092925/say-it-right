async function testWiki() {
  const places = ["bondi", "cronulla", "sydney", "brisbane", "parramatta", "geelong", "wollongong"];
  for (const p of places) {
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(p)}`, {
        headers: { "User-Agent": "SayItRightApp/1.0 (https://sayitright.app; info@sayitright.app)" },
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`[Wiki] ${p} => Title: "${data.title}", Description: "${data.description}", Extract: "${data.extract?.slice(0, 120)}..."`);
      }
    } catch (e) {
      console.log(`[Wiki] ${p} error:`, e.message);
    }
  }
}
testWiki();
