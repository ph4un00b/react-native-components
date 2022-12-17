import { View } from "react-native";
import { AppImageInput } from "./AppImageInput";

type ImageMultipleInput = {
  uris: string[];
  onRemoveImage: (uri: string) => void;
  onAddImage: (uri: string) => void;
};
export function AppImageMultipleInput({
  uris = [],
  onRemoveImage: handleRemoveImage,
  onAddImage: handleAddImage,
}: ImageMultipleInput) {
  return (
    <>
      {uris.map((uri) => {
        return (
          <View className="mb-2 mr-2">
            <AppImageInput
              imageUri={uri}
              key={uri}
              onChangeImage={() => handleRemoveImage(uri)}
            />
          </View>
        );
      })}
      <AppImageInput onChangeImage={(uri) => uri && handleAddImage(uri)} />
    </>
  );
}
