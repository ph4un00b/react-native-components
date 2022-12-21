import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";

export function VerifyCodePage() {
  const AUTH_CLERK = useSignUp();
  const [code, setCode] = React.useState("");

  const onPress = async () => {
    if (!AUTH_CLERK.isLoaded) return;

    try {
      const completeSignUp =
        await AUTH_CLERK.signUp.attemptEmailAddressVerification({
          code,
        });

      await AUTH_CLERK.setSession(completeSignUp.createdSessionId);
    } catch (err) {
      //@ts-ignore
      Alert.alert("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={code}
          style={styles.textInput}
          placeholder="Code..."
          placeholderTextColor="#000"
          onChangeText={(code) => setCode(code)}
        />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonText}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },

  inputView: {
    borderRadius: 5,
    width: "90%",
    height: 45,
    marginBottom: 20,
    borderColor: "#000",
    borderStyle: "solid",
    borderWidth: 1,
  },

  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  primaryButton: {
    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#000",
    color: "#ffffff",
  },

  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  titleText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  footer: {
    color: "#000",
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  secondaryButton: {
    marginTop: 15,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000",
  },

  secondaryButtonText: {
    color: "#000",
    fontWeight: "bold",
  },

  oauthView: {
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 20,
  },
});
