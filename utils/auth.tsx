import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-native";

import { removeToken } from "./auth.store";

type User = { token?: string; name?: string; image?: string };
// type AuthContextType = [User, Dispatch<SetStateAction<User>>];
type AuthContextType = {
  user: User | null;
  login: ({
    token,
    callback,
  }: {
    token: string;
    callback?: VoidFunction;
  }) => void;
  saveUser: (user: User, callback?: VoidFunction) => void;
  logout: (callback?: VoidFunction) => void;
};

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  const value = useContext(AuthContext);
  if (value == null) throw new Error("Provider missing!");

  return value;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  type LoginProps = {
    token: string;
    callback?: VoidFunction;
  };

  function login({ token, callback }: LoginProps) {
    console.log("💪");
    const opts = { method: "GET", headers: githubHeaders(token) };
    fetch("https://api.github.com/user", opts)
      .then((res) => jsonOrError(res, "@github/user"))
      .then((data: GithubProfile) => {
        setUser({
          name: data.login ?? data.name,
          token,
          image: data.avatar_url,
        });
      })
      .then(() => {
        callback?.();
        console.log("login-ready!! 💃");
      })
      .catch(console.warn);
  }

  function logout(callback?: VoidFunction) {
    setUser({});
    removeToken();
    callback?.();
  }

  function saveUser(user: User) {
    setUser(user);
  }

  const value = { user, login, logout, saveUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user?.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    console.log("=== saving ===", location);
    return <Navigate to="/github" state={{ from: location }} replace />;
  }
  return children;
}

function githubHeaders(aToken: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${aToken}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function jsonOrError(res: Response, err: string) {
  if (!res.ok) throw new Error("something went wrong " + err);
  return res.json();
}

/** copied from @see https://github.com/nextauthjs/next-auth/blob/dcb601987bb050f540c137440514ad54728ed801/packages/core/src/providers/github.ts */
/** @see https://docs.github.com/en/rest/users/users#get-the-authenticated-user */
export interface GithubProfile extends Record<string, unknown> {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username?: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  suspended_at?: string | null;
  collaborators?: number;
  two_factor_authentication: boolean;
  plan?: {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
  };
}
