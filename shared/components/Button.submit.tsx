import { ReactNode } from "react";
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
} from "react-native";
import { string } from "zod/lib";

type BtnProps = {
  className?: string;
  children: ReactNode;
  to?: string;
  onPress: (event: GestureResponderEvent) => void;
};

export function SubmitButton({ children, onPress, className }: BtnProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={"shadow-sm rounded-md btn bg-[#5046E4] hover:bg-red-400 h-16 p-4 justify-center items-center"}
      onPress={onPress}
    >
      <Text className="uppercase text-slate-200">{children}</Text>
    </TouchableOpacity>
  );
}
