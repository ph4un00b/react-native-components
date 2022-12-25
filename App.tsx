import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView, Text, View } from "react-native";
import "./generated/nativewind-output";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  NativeRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-native";
/** ensure that appropriate event handlers are registered with React Native */
// import "react-native-gesture-handler";

import { ListingPage } from "./screens/Indexes/Listing";
import { MenuPage } from "./screens/Indexes/Menu";
import { LoginPage } from "./screens/Login/Login";
import { NativeImagePage } from "./screens/Native/Image";
import { DrawerPage } from "./screens/UX/Drawer";
import { ClassSwipableListPage } from "./screens/Voting/ClassSwipableList";
import { ListPage } from "./screens/Voting/List";
import { SimpleSwipeListPage } from "./screens/Voting/SimpleSwipableList";
import { SwipeListInsidePage } from "./screens/Voting/SwipableListInside";
import { SwipeListPage } from "./screens/Voting/SwipeList";
import { GithubScreen } from "./screens/github";
import { LinkingScreen } from "./screens/linking";
import { AppBar } from "./shared/components/AppBar";
import { requestToken } from "./utils/auth.store";

type User = { token?: string; name?: string; image?: string };
type AuthContextType = [User, Dispatch<SetStateAction<User>>];
const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={useState({})}>{children}</AuthContext.Provider>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const [user] = useUser();
  const location = useLocation();

  if (!user.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/github" state={{ from: location }} replace />;
  }
  return children;
}

export function useUser() {
  const value = useContext(AuthContext);
  if (value == null) throw new Error("Provider missing!");
  return value;
}

export default function App() {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeRouter>
          <SafeAreaView className="flex items-center justify-center flex-1 bg-slate-800">
            <AppRestore />
            <AppBar />
            {/**
             * All <Route>s and <Link>s inside a <Routes> are relative.
             *  This leads to leaner and more predictable code in <Route path>
             *  and <Link to>
             * Routes are chosen based on the best match instead of being traversed
             * in order. This avoids bugs due to unreachable routes because they
             * were defined later in your <Switch>
             * Routes may be nested in one place instead of being spread out
             * in different components. In small to medium-sized apps, this
             *  lets you easily see all your routes at once. In large apps,
             * you can still nest routes in bundles that you load dynamically
             * via React.lazy
             * @see https://reactrouter.com/en/6.4.5/upgrading/v5#upgrade-all-switch-elements-to-routes
             */}
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route
                path="/protected"
                element={
                  <RequireAuth>
                    <ProtectedScreen />
                  </RequireAuth>
                }
              />
              <Route path="/github" element={<GithubScreen />} />
              <Route path="/linking" element={<LinkingScreen />} />
              <Route path="/drawer" element={<DrawerPage />} />
              <Route path="/native-image" element={<NativeImagePage />} />
              <Route path="/listing" element={<ListingPage />} />
              <Route path="/list" element={<ListPage />} />
              <Route path="/swipe-simple" element={<SimpleSwipeListPage />} />
              <Route path="/swipe-inside" element={<SwipeListInsidePage />} />
              <Route path="/swipe-class" element={<ClassSwipableListPage />} />
              <Route path="/swipe-outside" element={<SwipeListPage />} />
              <Route path="/signin" element={<LoginPage />} />
            </Routes>
          </SafeAreaView>
        </NativeRouter>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}

function AppRestore() {
  const [, dispatchUser] = useUser();
  const mountedRef = useRef(true);

  useEffect(() => {
    restoreToken();

    async function restoreToken() {
      const token = await requestToken();
      if (!token) return;

      fetch("https://api.github.com/user", {
        method: "GET",
        headers: githubHeaders(token),
      })
        .then((res) => jsonOrError(res, "@github/user"))
        .then((data: GithubProfile) => {
          if (!mountedRef.current) return;
          dispatchUser({
            name: data.login ?? data.name,
            token,
            image: data.avatar_url,
          });
        })
        .catch(console.error);
    }

    return () => {
      mountedRef.current = false;
    };
  }, [dispatchUser]);

  return null;
}

function ProtectedScreen() {
  return (
    <View>
      <Text className="text-2xl text-slate-200">Protected</Text>
    </View>
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
