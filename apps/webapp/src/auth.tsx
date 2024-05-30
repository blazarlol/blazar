import {
  Cookie,
  DatabaseSessionAttributes,
  DatabaseUserAttributes,
} from "@blazar/db";
import { apiTreaty } from "@blazar/elysia";
import {
  CustomError,
  getAuthSessionCookie,
  removeAuthSessionCookie,
} from "@blazar/helpers";
import { redirect } from "@tanstack/react-router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export interface AuthContext {
  session: DatabaseSessionAttributes | null;
  user: DatabaseUserAttributes | null;
  loading: boolean;
  updateAuthState: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

const fetchSession = async () => {
  const authCookieValue = getAuthSessionCookie("auth_session");

  if (!authCookieValue) {
    return null;
  }

  const { data, error } = await apiTreaty.api.auth["validate-session"].post({
    sessionId: authCookieValue,
  });

  if (error) {
    return null;
  }

  return data;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<DatabaseSessionAttributes | null>(
    null
  );
  const [user, setUser] = useState<DatabaseUserAttributes | null>(null);
  const [loading, setLoading] = useState(true);

  const updateAuthState = useCallback(async () => {
    setLoading(true);

    const sessionData = await fetchSession();

    if (!sessionData) {
      setSession(null);
      setUser(null);

      setLoading(false);
      return;
    }

    const { session, user } = sessionData;

    setSession(session);
    setUser(user);

    console.log(sessionData);

    setLoading(false);
  }, [session, user]);

  const signOut = useCallback(async () => {
    removeAuthSessionCookie("auth_session");

    setSession(null);
    setUser(null);
  }, []);

  useEffect(() => {
    const setIntialAuthState = async () => {
      await updateAuthState();
    };

    setIntialAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, user, loading, updateAuthState, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
