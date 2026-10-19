export interface UserSession {
  userId: string;
  email: string;
  roles: string[];
  issuedAt: number;
}

export function parseBearerToken(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7).trim();
}

export function verifySessionToken(token: string): UserSession | null {
  if (!token) return null;

  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles || ["user"],
      issuedAt: payload.iat || Date.now()
    };
  } catch (err) {
    return null;
  }
}
