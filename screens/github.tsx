import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { useState } from "react";
import { Alert, Button, ScrollView, Text, View } from "react-native";
import { z } from "zod";

const schema = z.object({
  GITHUB_SECRET: z.string().min(1),
});

/** when necessary @see https://docs.expo.dev/eas-update/environment-variables/#creating-an-envts-file-to-get-environment-variables */
const env = Object.freeze(schema.parse(Constants.expoConfig?.extra));
WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/" +
    "9f1a3556679112ca7ad5",
};

export function GithubScreen() {
  const [profile, setProfile] = useState<{
    id: string;
    name: string;
    email: string;
    image: string;
  }>(null!);
  /**
   * this hook 'Linking#useURL' uses
   * Linking.getInitialURL and
   * Linking.addEventListener('url', callback)
   *
   * under the hood
   *
   * =========
   * terminal expo-go test cmd:
   * $ p|npx uri-scheme open exp://(YOUR_IP)192.168.1.110:19000/--/URI?QUERY=PARAM --android
   */
  const url = Linking.useURL();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: "9f1a3556679112ca7ad5",
      //   scopes: ["identity"],
      scopes: ["user:email"],
      redirectUri: makeRedirectUri({
        /** YOU NEED TO MATCH THE SCHEME FROM APP.JSON */
        scheme: "testexpo",
        /** YOU NEED THIS TO USE THE AUTH.EXPO.IO PROXY ON EXPO_GO */
        useProxy: true,
      }),
    },
    discovery
  );

  React.useEffect(() => {
    console.log({ response });
    if (response?.type == "success") {
      //   # get temporary GitHub code...
      const { code } = response.params;
      code && console.log({ code });
      code && Alert.alert(code);

      let tmpProfile: {
        id: string;
        name: string;
        email: string | null;
        image: string;
      } = null!;

      let aToken = "";
      const params = new URLSearchParams({
        client_id: "9f1a3556679112ca7ad5",
        client_secret: env.GITHUB_SECRET,
        code,
      }).toString();

      fetch(`https://github.com/login/oauth/access_token?${params}`, {
        method: "POST",
        headers: { Accept: "application/json" },
      })
        .then((res) => jsonOrError(res, "@github-provider"))
        .then(({ access_token, scope, token_type }) => {
          aToken = access_token;
          /** @see https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user */
          return fetch("https://api.github.com/user", {
            method: "GET",
            headers: githubHeaders(aToken),
          });
        })
        .then((res) => jsonOrError(res, "@github/user"))
        .then((data: GithubProfile) => {
          tmpProfile = {
            id: data.id.toString(),
            name: data.login ?? data.name,
            email: data.email,
            image: data.avatar_url,
          };
        })
        .then(() => {
          return fetch("https://api.github.com/user/emails", {
            /** @see https://docs.github.com/en/rest/users/emails?apiVersion=2022-11-28 */
            method: "GET",
            headers: githubHeaders(aToken),
          });
        })
        .then((res) => jsonOrError(res, "@github/emails"))
        .then((data: GithubEmail[]) => {
          setProfile({
            ...tmpProfile,
            email: (data.find((e) => e.primary) ?? data[0]).email,
          });
        })
        .catch(console.error);
    }
  }, [response]);

  return (
    <ScrollView>
      {url && (
        <Text className="text-2xl text-slate-100">
          link from callbacks: {url}
        </Text>
      )}
      {profile && (
        <Text className="text-2xl text-green-300">
          {JSON.stringify(profile, null, 2)}
        </Text>
      )}
      <Button
        disabled={!request}
        title="Login"
        onPress={() => {
          promptAsync({ useProxy: true });
        }}
      />
    </ScrollView>
  );
}

/** copied from @see https://github.com/nextauthjs/next-auth/blob/dcb601987bb050f540c137440514ad54728ed801/packages/core/src/providers/github.ts */
/** @see [Get the authenticated user](https://docs.github.com/en/rest/users/users#get-the-authenticated-user) */
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

interface GithubEmail extends Record<string, unknown> {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "public" | "private";
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
