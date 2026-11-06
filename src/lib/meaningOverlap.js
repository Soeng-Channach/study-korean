// Two answers are "the same" when they share a sense, e.g. "help" and
// "help; assistance", or "to have" and "have". Quiz distractors must not.
export function senses(text) {
  return String(text || '')
    .toLowerCase()
    .split(/[;,/]/)
    .map((part) => part.replace(/\(.*?\)/g, '').replace(/^to /, '').trim())
    .filter(Boolean);
}

export function sharesSense(a, b) {
  const set = new Set(senses(a));
  return senses(b).some((sense) => set.has(sense));
}
