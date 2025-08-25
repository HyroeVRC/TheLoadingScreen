// Entrée : JSON sur stdin, ex. [{ "display_name":"Alice", "total_ms": 43512123 }, ...]
// Sortie : texte "[PSEUDO] : 00:00:00:000" trié décroissant.
function pad(n, w){ n = String(n); return n.length>=w ? n : "0".repeat(w-n.length)+n; }
function msToStr(totalMs){
  if (totalMs < 0) totalMs = 0;
  const hours = Math.floor(totalMs / 3600000);
  totalMs -= hours * 3600000;
  const mins  = Math.floor(totalMs / 60000);
  totalMs -= mins * 60000;
  const secs  = Math.floor(totalMs / 1000);
  totalMs -= secs * 1000;
  const ms    = Math.floor(totalMs);
  return `${pad(hours,2)}:${pad(mins,2)}:${pad(secs,2)}:${pad(ms,3)}`;
}

(async () => {
  let buf = "";
  for await (const chunk of process.stdin) buf += chunk;
  const arr = JSON.parse(buf || "[]");
  arr.sort((a,b)=> (b.total_ms||0) - (a.total_ms||0));
  const lines = arr.map(x => `[${x.display_name||"?"}] : ${msToStr(Number(x.total_ms||0))}`);
  process.stdout.write(lines.join("\n") + "\n");
})();
