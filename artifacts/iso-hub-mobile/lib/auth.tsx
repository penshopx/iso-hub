import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const AUTH_TOKEN_KEY = 'auth_session_token';
const ISSUER_URL =
  process.env.EXPO_PUBLIC_ISSUER_URL ?? 'https://replit.com/oidc';

export interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getApiBaseUrl(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  return domain ? `https://${domain}` : '';
}

function getClientId(): string {
  return process.env.EXPO_PUBLIC_REPL_ID ?? '';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const discovery = AuthSession.useAutoDiscovery(ISSUER_URL);
  const redirectUri = AuthSession.makeRedirectUri();
  const nonce = useMemo(() => Crypto.randomUUID(), []);

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: getClientId(),
      scopes: ['openid', 'email', 'profile', 'offline_access'],
      redirectUri,
      prompt: AuthSession.Prompt.Login,
      extraParams: { nonce },
    },
    discovery,
  );

  const fetchUser = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (!token) {
        setUser(null);
        return;
      }

      const res = await fetch(`${getApiBaseUrl()}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as { user?: AuthUser | null };

      if (res.ok && data.user) {
        setUser(data.user);
      } else {
        await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (response?.type !== 'success' || !request?.codeVerifier) return;

    const { code, state } = response.params;
    setIsLoading(true);

    (async () => {
      try {
        const exchangeRes = await fetch(
          `${getApiBaseUrl()}/api/mobile-auth/token-exchange`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              code,
              code_verifier: request.codeVerifier,
              redirect_uri: redirectUri,
              state,
              nonce,
            }),
          },
        );

        if (!exchangeRes.ok) {
          setUser(null);
          return;
        }

        const data = (await exchangeRes.json()) as { token?: string };
        if (!data.token) {
          setUser(null);
          return;
        }

        await SecureStore.setItemAsync(AUTH_TOKEN_KEY, data.token);
        await fetchUser();
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [fetchUser, nonce, redirectUri, request, response]);

  const login = useCallback(async () => {
    if (!request) return;
    await promptAsync();
  }, [promptAsync, request]);

  const logout = useCallback(async () => {
    try {
      const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
      if (token) {
        await fetch(`${getApiBaseUrl()}/api/mobile-auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } finally {
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      setUser(null);
    }
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [isLoading, login, logout, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}