import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView, Text, View } from "react-native";
import "./nativewind-output";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeRouter, Route, Routes } from "react-router-native";
/** ensure that appropriate event handlers are registered with React Native */
// import "react-native-gesture-handler";

import { SkiaCanvas } from "./screens/Animations/declarative.skia";
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
import { AuthProvider, RequireAuth, useAuth } from "./utils/auth";
import { requestToken } from "./utils/auth.store";

// Keep the splash screen visible while we fetch resources
// todo: image
/** @see https://docs.expo.dev/guides/splash-screens/ */
SplashScreen.preventAutoHideAsync();

/** @see https://github.com/pmndrs/jotai/blob/main/docs/utils/atom-with-storage.mdx */
const storage = createJSONStorage(() => AsyncStorage);
const appBarAtom = atomWithStorage("app-bar", true, storage);

export function useBar() {
  return useAtom(appBarAtom);
}

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
            <Suspense fallback={<></>}>
              <AppBar />
            </Suspense>
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
              <Route path="/skia-declarative" element={<SkiaCanvas />} />
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

type RestoreProps = {
  dispatchAppIsReady: Dispatch<SetStateAction<boolean>>;
};
function AppRestore({ dispatchAppIsReady }: RestoreProps) {
  const mountedRef = useRef(true);
  console.log("app-restore");
  const auth = useAuth();
  useEffect(() => {
    console.log("restoring user!!", auth.user);
    restoreUser();

    async function restoreUser() {
      try {
        const token = await requestToken();
        if (!mountedRef.current) return;
        if (!token) return dispatchAppIsReady(true);
        auth.login({
          token,
          callback: () => dispatchAppIsReady(true),
        });
      } catch (error) {
        console.log(error);
      }
    }
    return () => {
      console.log("🔚 - app-restore");
      mountedRef.current = false;
    };
  }, [auth, dispatchAppIsReady]);

  return null;
}

function ProtectedScreen() {
  return (
    <View>
      <Text className="text-2xl text-slate-200">Protected</Text>
    </View>
  );
}
