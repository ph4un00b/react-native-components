/**
 * max 2048 bytes
 * Please note that for iOS standalone apps, `
 * data stored with expo-secure-store can persist across app installs.
 * @see https://docs.expo.dev/versions/latest/sdk/securestore/
 * @description only for android > v5
 */
import * as SecureStore from "expo-secure-store";

export async function store({ key, value }: { key: string; value: string }) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(error);
  }
}

export async function request({ key }: { key: string }) {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(error);
  }
}

export async function remove({ key }: { key: string }) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(error);
  }
}
