import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Route, Routes } from "react-router-native";
import { AppBar } from "../../shared/components/AppBar";
import { List } from "./List";

export function Main() {
    return (
        <SafeAreaView className="items-center justify-center flex-1 bg-blue-400">
            <AppBar />
            {
                /**
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
                 */
            }
            <Routes>
                <Route path="/" element={<List />} />
                <Route
                    path="/signin"
                    element={
                        <View>
                            <Text>Working on it!</Text>
                        </View>
                    }
                />
            </Routes>
        </SafeAreaView>
    );
}
