import React from "react";
// import { Text, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import { SubmitButton } from "./Button.submit";
import { Alert } from "react-native";

export function SignUpWithOauth() {
  const AUTHCLERK = useSignUp();

  const onPress = React.useCallback(async () => {
    if (!AUTHCLERK.isLoaded) {
      return;
    }

    try {
      // Create a redirect url for the current platform and environment.
      //
      // This redirect URL needs to be whitelisted for your instance via
      // https://reference.clerk.dev/reference/backend-api-reference/redirect-urls#add-a-redirect-url
      //
      // For more information go to:
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturi
      const redirectUrl = AuthSession.makeRedirectUri({
        scheme: "myapp",
        path: "/oauth-native-callback",
      });

      console.log('1', redirectUrl)
      await AUTHCLERK.signUp.create({
        strategy: "oauth_github",
        redirectUrl,

      });

      console.log('2')
      const {
        verifications: {
          externalAccount: { externalVerificationRedirectURL },
        },
      } = AUTHCLERK.signUp;

      console.log('3', externalVerificationRedirectURL!.toString())
      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL!.toString(),
        returnUrl: redirectUrl,
      });

      
      console.log('4')
      // @ts-ignore
      const { type, params } = result || {};

      console.log('5', type)
      // Check all the possible AuthSession results
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#returns-7
      if (type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      console.log('6', params)
      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params;

      console.log('7', rotatingTokenNonce)
      // Use it once to reload the complete sign up object
      await AUTHCLERK.signUp.reload({ rotatingTokenNonce });

      console.log('8')
      const { createdSessionId } = AUTHCLERK.signUp;

      console.log('9')
      if (!createdSessionId) {
        throw "Something went wrong during the Sign up OAuth flow. Please ensure that all sign up requirements are met.";
      }

      console.log('10')
      await AUTHCLERK.setSession(createdSessionId);
      console.log('11', createdSessionId)
      return;
    } catch (err) {
      // @ts-ignore
      Alert.alert("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  }, []);

  return (
    <SubmitButton onPress={onPress}>github</SubmitButton>
    // <TouchableOpacity
    //   style={{ ...styles.secondaryButton, marginBottom: 20 }}
    //   onPress={onPress}
    // >
    //   <Text style={styles.secondaryButtonText}>Sign up with Google</Text>
    // </TouchableOpacity>
  );
}
