import { FlatList, View } from "react-native";
import { MemoRowItem } from "../../shared/components/ListItem.android";
import movies from "../../data/30-movies.json";

export function ListingPage() {
  return (
    <View className="flex flex-1 w-full bg-gray-800">
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
    </View>
  );
}
