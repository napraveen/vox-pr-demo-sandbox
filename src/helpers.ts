export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

export function formatTimestamp(ms: number): string {
  return new Date(ms).toISOString();
}

export function maskToken(token: string): string {
  if (!token) return "";
  return token.substring(0, 4) + "****" + token.substring(token.length - 4);
}
