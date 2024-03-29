import { View, Image, TouchableWithoutFeedback, Alert } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { color } from "react-native-tailwindcss";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

type ImageInputProps = {
  imageUri?: string;
  onChangeImage?: (uri?: string) => void;
};

async function requestPermission() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) Alert.alert("You need to enable image permission to access.");
}

export function AppImageInput({
  imageUri,
  onChangeImage: onChangeFn,
}: ImageInputProps) {
  useEffect(() => {
    requestPermission();
    return () => {};
  }, []);

  /**
   * overflow-hidden necessary to repect the rounded corners!
   * we use TouchableWithoutFeedback since we already got feedback!
   */
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="flex items-center justify-center w-[100px] h-[100px] overflow-hidden rounded-md shadow-sm bg-slate-700">
        {!imageUri && (
          <FontAwesome5 name="camera-retro" size={44} color={color.gray300} />
        )}
        {imageUri && (
          <Image className="w-full h-full" source={{ uri: imageUri }} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );

  function handlePress() {
    console.log("presssed?");
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert("Delete", "Are you sure you want to delete the image?", [
        {
          text: "Yes",
          onPress: () => {
            onChangeFn?.(undefined);
          },
        },
        { text: "No" },
      ]);
    }
  }

  async function selectImage() {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        // only images
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // for upload
        quality: 0.5,
      });
      if (!res.canceled) {
        console.log({ uri: res.assets[0].uri });
        onChangeFn?.(res.assets[0].uri);
      }
    } catch (error) {
      console.error("error reading an image", error);
    }
  }
}
