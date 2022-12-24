import { SafeAreaView } from "react-native";
import "./generated/nativewind-output";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NativeRouter, Route, Routes } from "react-router-native";
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

export default function App() {
  return (
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
  );
}
