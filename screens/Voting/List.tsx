import React, { useState } from "react";
import {
    Button,
    FlatList,
    GestureResponderEvent,
    Image,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from "react-native";
import movies from "../../data/30-movies.json";

type ItemProps = {
    itemId: string;
    itemUrl: string;
    itemTitle: string;
    onPress: (event: GestureResponderEvent) => void;
    isSelected: boolean;
};

const Item = ({
    itemId,
    itemUrl,
    itemTitle,
    onPress,
    isSelected,
}: ItemProps) => {
    const [vote, setVote] = useState(0);
    console.log("<item>", itemId);
    const bgStyles = `${isSelected ? "bg-purple-800" : "bg-blue-200"
        } p-8 my-4 mx-4`;
    const textStyles = `${isSelected ? "text-white" : "text-black"
        } text-2xl pt-4`;

    const Card = (
        <View className={bgStyles}>
            {
                /**
                 * for local images <Image> reads the metadata
                 * hence you dont need to pass the styles
                 * fadeDuration - android only!
                 * @see https://reactnative.dev/docs/image
                 */
            }
            <Image
                className="w-24 h-24 bg-black rounded-md"
                resizeMode="contain"
                fadeDuration={1000}
                blurRadius={6}
                source={{ uri: itemUrl }}
            />
            <Text className={textStyles}>{itemTitle}</Text>
            <Button title={"Vote! " + vote} onPress={() => setVote((p) => p + 1)} />
        </View>
    );

    if (Platform.OS == "android") {
        return (
            <TouchableNativeFeedback key={itemTitle} onPress={onPress}>
                {Card}
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity key={itemTitle} onPress={onPress}>
            {Card}
        </TouchableOpacity>
    );
};

const areEqual = (prevProps: any, nextProps: any) => {
    //   console.log("==?");
    const { isSelected } = nextProps;
    const { isSelected: prevIsSelected } = prevProps;
    /*if the props are equal, it won't update*/
    const isSelectedEqual = isSelected == prevIsSelected;
    return isSelectedEqual;
};

const MemoItem = React.memo(Item, areEqual);
const keyExtractor = (item: any) => item.id;

export function List() {
    console.log("<List>");
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }: { item: any }) => {
        return (
            <MemoItem
                itemId={item.id}
                itemTitle={item.title}
                itemUrl={item.photoUrL}
                onPress={() => {
                    setSelectedId(item.id);
                }}
                isSelected={item.id == selectedId}
            />
        );
    };

    return (
        <SafeAreaView className="items-center justify-center flex-1 bg-purple-400">
            <FlatList
                data={movies.movies}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                extraData={selectedId}
            />
        </SafeAreaView>
    );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });
