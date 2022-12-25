import { remove, request, store } from "./secureStore";

export async function storeToken(value: string) {
  await store({ key: "authToken", value });
}

export async function removeToken() {
  await remove({ key: "authToken" });
}

export async function requestUser() {
  const token = await requestToken();
  if (!token) return;

  return fetch("https://api.github.com/user", {
    method: "GET",
    headers: githubHeaders(token),
  })
    .then((res) => jsonOrError(res, "@github/user"))
    .then((data: GithubProfile) => {
      return {
        name: data.login ?? data.name,
        token,
        image: data.avatar_url,
      };
    })
    .catch(console.warn);
}

async function requestToken() {
  return request({ key: "authToken" });
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
