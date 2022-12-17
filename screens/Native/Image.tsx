import { Alert, Button, FlatList, Text, View, Image } from "react-native";
import { AppIcon } from "../../shared/components/AppIcon";
import { color } from "react-native-tailwindcss";
import { RowItem } from "../../shared/components/ListItem";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { AppImageInput } from "../../shared/components/AppImageInput";

const iconSize = 50;
const menuItems = [
  {
    title: "image",
    icon: {
      element: (
        <AppIcon size={iconSize} bgColor={"bg-pink-500"}>
          <AntDesign
            name="infocirlceo"
            size={iconSize * 0.5}
            color={color.gray300}
          />
        </AppIcon>
      ),
    },
  },
  {
    title: "item 2",
    icon: {
      element: (
        <AppIcon size={iconSize} bgColor={"bg-blue-500"}>
          <AntDesign
            name="customerservice"
            size={iconSize * 0.5}
            color={color.gray300}
          />
        </AppIcon>
      ),
    },
  },
];

async function requestPermission() {
  const { granted } = await ImagePicker.requestCameraPermissionsAsync();
  if (!granted) Alert.alert("You need to enable camera permission to access.");
}

export function NativeImagePage() {
  const [mainImageUri, setMainImageUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    requestPermission();
    return () => {};
  }, []);

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
        setMainImageUri(res.assets[0].uri);
      }
    } catch (error) {
      console.error("error reading an image", error);
    }
  }

  return (
    <View className="flex flex-1 w-full bg-gray-800">
      <View className="mt-6">
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <RowItem
              notSelectedColor="bg-slate-700"
              notSelectedTitleColor="text-slate-200"
              icon={item.icon.element}
              itemTitle={item.title}
              isSelected={false}
            />
          )}
          ListFooterComponent={
            <>
              <Button title="Select Image" onPress={selectImage} />
              {mainImageUri && (
                <Image
                  className="w-[200px] h-[200px]"
                  source={{ uri: mainImageUri }}
                />
              )}

              <View className="flex flex-col">
                <Text className="text-slate-300">on-change</Text>
                <AppImageInput onChangeImage={(uri) => setMainImageUri(uri)} />
                <Text className="text-slate-300">solo</Text>
                <AppImageInput />
              </View>

              <View className="mt-4">
                <RowItem
                  notSelectedColor="bg-slate-700"
                  notSelectedTitleColor="text-slate-200"
                  icon={
                    <AppIcon size={iconSize} bgColor={"bg-emerald-500"}>
                      <Ionicons
                        name="md-logo-electron"
                        size={iconSize * 0.5}
                        color={color.gray300}
                      />
                    </AppIcon>
                  }
                  itemTitle={"logout"}
                  isSelected={false}
                />
              </View>
            </>
          }
        />
      </View>
    </View>
  );
}
