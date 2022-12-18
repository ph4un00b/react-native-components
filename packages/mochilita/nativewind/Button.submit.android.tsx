import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";

type BtnProps = {
  className?: string;
  children: ReactNode;
  to?: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function SubmitButton({ children, onPress, className }: BtnProps) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View className={"shadow-sm rounded-md btn bg-[#5046E4] hover:bg-red-400 h-16 p-4 justify-center items-center"}>
        <Text className="uppercase text-slate-200">{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
