import { Alert, ScrollView, Text, View } from "react-native";
import { SubmitButton } from "../shared/components/Button.submit";
import * as Linking from "expo-linking";
import { useEffect } from "react";
import { useNavigate } from "react-router-native";

const redirectUrl = Linking.createURL("/home", {
  queryParams: { hello: "world" },
});

// Linking.addEventListener("url", (e) => console.log(e));
export function LinkingScreen() {
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!url) return;
    console.log({ url });
    /**
     * So, there are three approaches you can take:
     * If you have control over the URI,
     *  add a third slash after the scheme (myapp:///hello/world)
     *  so that the host portion of the URI is empty.
     * If you have control over the URI,
     *  remove the two slashes after the scheme
     *  and use a URN instead of URL (myapp:hello/world).
     * If you don't have control over the URI,
     *  change your application code to join
     *  together the parsed URL's host and path
     *  with a slash ('hello' + '/' + 'world').
     * @see https://github.com/expo/expo/issues/6497#issuecomment-574882448
     */
    const { hostname, path, queryParams } = Linking.parse(url);
    console.log({ hostname, path, queryParams });
    /**
     * if you don't add "/" at the begining
     * the path will be a sub-directory of the curent path
     *
     * the parsing process (Linking.parse(url)
     * will remove the slash.
     * make sure to prepend a new slash "/"
     */
    console.log("goingto:/" + path);
    path && navigate("/" + path);
    return () => console.log("bye");
  }, [url]);

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    Alert.alert(
      `hostname ${hostname}, \npath: ${path}, \ndata: ${JSON.stringify(
        queryParams
      )}`
    );
  }

  return (
    <ScrollView className="flex flex-1 px-4">
      <View>
        {url && (
          <Text className="text-2xl text-slate-100">
            link from callbacks: {url}
          </Text>
        )}
        <SubmitButton onPress={() => Linking.openURL("https://expo.dev")}>
          open expo web-page
        </SubmitButton>

        <Text className="text-lg text-slate-100">open: {redirectUrl}</Text>

        <SubmitButton
          onPress={() => {
            Linking.openURL(redirectUrl);
          }}
        >
          push link
        </SubmitButton>
      </View>
    </ScrollView>
  );
}
