export function debounce<T extends (...args: unknown[]) => void>(fn: T, delayMs: number) {
  let timerId: number | undefined;
  return (...args: Parameters<T>) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => fn(...args), delayMs);
  };
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}…`;
}
