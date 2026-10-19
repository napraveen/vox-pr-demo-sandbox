export interface UserSession {
  userId: string;
  email: string;
  roles: string[];
  issuedAt: number;
}

const revokedTokens = new Set<string>();

export function parseBearerToken(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7).trim();
}

export function revokeSessionToken(token: string): boolean {
  if (!token) return false;
  revokedTokens.add(token);
  return true;
}

export function verifySessionToken(token: string): UserSession | null {
  if (!token) return null;

  if (revokedTokens.has(token)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));

    // Check token expiration (expires after 1 hour = 3600000 ms)
    const tokenAge = Date.now() - (payload.iat || 0);
    if (tokenAge > 3600000) {
      return null;
    }

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
