import { Button, FlatList, Text, View } from "react-native";
import { AppIcon } from "../../shared/components/AppIcon";
import { color } from "react-native-tailwindcss";
import { RowItem } from "../../shared/components/ListItem.android";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const iconSize = 50;
const menuItems = [
  {
    title: "item 1",
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

export function MenuPage() {
  return (
    <View className="flex flex-1 w-full bg-gray-800">
      <View>
        <RowItem
          imageUrl="https://placekitten.com/300/300"
          itemTitle={"jamon"}
          isSelected={true}
        >
          <Text className="text-slate-200">
            How to Create Apple TV Application with React Native
          </Text>
        </RowItem>
      </View>

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
        />
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
    </View>
  );
}
