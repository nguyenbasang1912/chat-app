export default function deduplicate<T>(arr: Array<T>) {
  const result: T[] = [];
  const existing = new Map();

  arr.forEach(item => {
    if (!existing.has(JSON.stringify(item))) {
      result.push(item);
      existing.set(JSON.stringify(item), true);
    }
  });

  return result;
}
