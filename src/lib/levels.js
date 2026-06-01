export const LEVELS = ['TOPIK I', 'TOPIK II'];

// Treats a missing level as TOPIK II, since existing content is all TOPIK II.
export function levelOf(item) {
  return item.level || 'TOPIK II';
}

export function countByLevel(items) {
  const counts = { 'TOPIK I': 0, 'TOPIK II': 0 };
  items.forEach((item) => {
    const key = levelOf(item);
    if (counts[key] !== undefined) counts[key] += 1;
  });
  return counts;
}
