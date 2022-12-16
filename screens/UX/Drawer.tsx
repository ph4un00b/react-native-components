import { FlatList, View, Text, I18nManager } from "react-native";
import { MemoRowItem } from "../../shared/components/ListItem.android";
import movies from "../../data/30-movies.json";
/** @see https://docs.swmansion.com/react-native-gesture-handler/docs/api/components/drawer-layout */
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { color } from "react-native-tailwindcss";

export function DrawerPage() {
  return (
    <View className="flex flex-1 w-full bg-gray-800">
      <DrawerLayout
        drawerWidth={200}
        drawerPosition={I18nManager.isRTL ? "right" : "left"}
        drawerType="front"
        drawerBackgroundColor={color.gray800}
        renderNavigationView={() => (
          <View>
            <Text className="text-slate-200">I am in the drawer!</Text>
          </View>
        )}
        onDrawerSlide={(status) => console.log(status)}
      >
        <View className="mt-6">
          <FlatList
            data={movies.movies}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <MemoRowItem
                notSelectedColor="bg-slate-700"
                notSelectedTitleColor="text-slate-200"
                imageUrl={item.photoUrL}
                itemTitle={item.title}
                isSelected={false}
              />
            )}
          />
        </View>
      </DrawerLayout>
    </View>
  );
}
