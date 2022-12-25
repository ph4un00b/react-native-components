import * as SplashScreen from "expo-splash-screen";
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
import { requestUser } from "./utils/auth.store";

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

// Keep the splash screen visible while we fetch resources
// todo: image @see https://docs.expo.dev/guides/splash-screens/
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    hideSplashScreen();

    async function hideSplashScreen() {
      if (appIsReady) await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <AuthProvider>
      <AppRestore dispatchAppIsReady={setAppIsReady} />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeRouter>
          <SafeAreaView className="flex items-center justify-center flex-1 bg-slate-800">
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

function AppRestore({
  dispatchAppIsReady,
}: {
  dispatchAppIsReady: Dispatch<SetStateAction<boolean>>;
}) {
  const [user, dispatchUser] = useUser();

  useEffect(() => {
    console.log("restoring user!!");
    // if (user.token) return;
    restoreUser();

    async function restoreUser() {
      try {
        const user = await requestUser();
        if (!user) return;
        dispatchUser(user);
      } catch (error) {
        console.log(error);
      } finally {
        dispatchAppIsReady(true);
        console.log("app-is-ready!!");
      }
    }
  }, [dispatchUser, dispatchAppIsReady]);

  return null;
}

function ProtectedScreen() {
  return (
    <View>
      <Text className="text-2xl text-slate-200">Protected</Text>
    </View>
  );
}
