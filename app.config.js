import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { z } from "zod";
/** @see https://docs.expo.dev/eas-update/environment-variables/ */
dotenv.config();

const schema = z.object({
  GITHUB_SECRET: z.string().min(1),
  /**
   * from .env file =/= from cross-env
   *
   *  z.coerce.boolean().parse("tuna"); // => true
      z.coerce.boolean().parse("true"); // => true
      z.coerce.boolean().parse("false"); // => true
      z.coerce.boolean().parse(1); // => true
      z.coerce.boolean().parse([]); // => true

      z.coerce.boolean().parse(0); // => false
      z.coerce.boolean().parse(undefined); // => false
      z.coerce.boolean().parse(null); // => false
   */
  DEV_MODE: z.coerce.boolean(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  const { fieldErrors } = parsed.error.flatten();
  console.error({ fieldErrors });
  process.exit(0);
}

/** @type {z.infer<typeof schema>} */
const env = Object.freeze(parsed.data);

const baseConfig = {
  expo: {
    plugins: [
      [
        "expo-image-picker",
        {
          photosPermission: "Allow $(PRODUCT_NAME) to access your photos",
          cameraPermission: "Allow $(PRODUCT_NAME) to access your camera",
        },
      ],
    ],
    /**
     * DEV_MODE
     * "remove on expo-go mode": "$ npx expo start --android"
     * on BUILD MODE
     * - originalFullName
     * - currentFullName
     * are necessary for auth-session in build mode": "$ npx expo config --type public"
     * */
    // originalFullName: "@phau/testexpo2",
    // currentFullName: "@phau/testexpo2",
    owner: "phau",
    scheme: "testexpo",
    name: "testexpo2",
    slug: "testexpo2",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      permissions: ["android.permission.RECORD_AUDIO"],
      package: "com.phau.testexpo",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      GITHUB_SECRET: env.GITHUB_SECRET,
      DEV_MODE: env.DEV_MODE,
      eas: {
        projectId: "8e6d2dac-f395-4b01-b889-cd73ffb5f92a",
      },
    },
  },
};
export default () => {
  return baseConfig;
};
