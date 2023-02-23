import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Button, FlatList, Text, View } from "react-native";
import { color } from "react-native-tailwindcss";
import { useNavigate } from "react-router-native";

import { AppIcon } from "../../shared/components/AppIcon";
import { RowItem } from "../../shared/components/ListItem";
import { removeToken } from "../../utils/auth.store";

const iconSize = 50;
const menuItems = [
  {
    itemUri: "/skia-declarative",
    title: "skia-declarative",
    icon: {
      element: (
        <AppIcon size={iconSize} bgColor="bg-pink-500">
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
        <AppIcon size={iconSize} bgColor="bg-blue-500">
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

export function MenuPage() {
  const navigate = useNavigate();
  return (
    <View className="flex flex-1 w-full bg-gray-800">
      <View className="mt-6">
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <RowItem
              // onPress={() => item.itemUri && navigate(item.itemUri)}
              notSelectedColor="bg-slate-700"
              notSelectedTitleColor="text-slate-200"
              icon={item.icon.element}
              itemTitle={item.title}
              isSelected={false}
            />
          )}
        />
      </View>

      <View className="mt-4">
        <RowItem
          onPress={() => {
            removeToken();
            navigate("/github");
          }}
          notSelectedColor="bg-slate-700"
          notSelectedTitleColor="text-slate-200"
          icon={
            <AppIcon size={iconSize} bgColor="bg-emerald-500">
              <Ionicons
                name="md-logo-electron"
                size={iconSize * 0.5}
                color={color.gray300}
              />
            </AppIcon>
          }
          itemTitle="logout"
          isSelected={false}
        />
      </View>
    </View>
  );
}
