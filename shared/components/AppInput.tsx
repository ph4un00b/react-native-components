import { useState } from "react";
import { TextInputProps, View, Text, TouchableOpacity } from "react-native";

type InputProps = {
  defaultValue?: string;
  name: string;
  min?: number;
  rightIcon?: React.ReactNode;
  leftIcon: React.ReactNode;
  showIcon?: React.ReactNode;
  hideIcon?: React.ReactNode;
  children?: React.ReactNode;
  title?: string;
  pattern?: string;
  label: string;
  type: "text" | "secret";
} & TextInputProps;

export function AppInput({
  name,
  min,
  rightIcon,
  leftIcon,
  hideIcon,
  showIcon,
  label,
  type,
  title,
  placeholder,
  pattern,
  children,
}: InputProps) {
    const [hideSecret, setHideSecret] = useState(true)
  return (
    <>
      <Text className="pl-1.5 capitalize font-medium">{label}</Text>
      <View>
        <View className="absolute z-10 pr-4 border-r-2 top-7 left-8 border-slate-300">
          {leftIcon}
        </View>

        <View className="flex flex-row w-full p-4">{children}</View>

        {rightIcon && (
          <View className="absolute z-10 pl-4 border-l-2 top-7 right-8 border-slate-300">
            {rightIcon}
          </View>
        )}

        {type == "secret" && (
          <TouchableOpacity onPress={() => setHideSecret(!hideSecret)}  className="absolute z-10 pl-4 border-l-2 top-7 right-8 border-slate-300">
            {hideSecret ? hideIcon : showIcon}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
