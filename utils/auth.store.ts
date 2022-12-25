import { request, remove, store } from "./secureStore";

export async function storeToken(value: string) {
  await store({ key: "authToken", value });
}

export async function requestToken() {
  return request({ key: "authToken" });
}

export async function removeToken() {
  await remove({ key: "authToken" });
}
