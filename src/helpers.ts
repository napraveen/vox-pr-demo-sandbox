export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

export function formatTimestamp(ms: number): string {
  return new Date(ms).toISOString();
}
