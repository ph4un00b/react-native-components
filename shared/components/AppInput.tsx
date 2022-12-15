import { useState } from "react";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

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
  type: "text" | "secret" | "email";
  value: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  placeholder: string;
  error?: any;
  errorText?: string;
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
  value,
  onChange,
  onBlur,
  error,
  errorText,
}: InputProps) {
  const [hideSecret, setHideSecret] = useState(true);
  const [extraStyles, setExtraStyles] = useState("bg-sky-500");
  console.log({ errorText });
  return (
    <>
      <Text className="pl-1.5 capitalize block text-sm font-medium text-gray-700">
        {label}
      </Text>

      <View>
        <View className="absolute z-10 pr-4 border-r-2 top-7 left-4 border-slate-300">
          {leftIcon}
        </View>

        <View className="flex flex-row w-full pt-4">
          <TextInput
            className={
              extraStyles +
              " shadow-sm w-full h-16 text-xl pl-[90px] pr-16 my-1 mb-2 border-2 rounded-lg " +
              (error ? "border-purple-400" : "border-slate-200")
            }
            placeholder={placeholder}
            onFocus={() => {
              setExtraStyles("bg-rose-200 text-black");
            }}
            onBlur={() => {
              setExtraStyles("bg-sky-500 text-slate-100");
              onBlur();
            }}
            onChangeText={onChange}
            keyboardType={type == "email" ? "email-address" : "default"}
            secureTextEntry={type == "secret"}
            value={value}
          />
        </View>

        {rightIcon && (
          <View className="absolute z-10 pl-4 border-l-2 top-7 right-4 border-slate-300">
            {rightIcon}
          </View>
        )}

        {type == "secret" && (
          <TouchableOpacity
            onPress={() => setHideSecret(!hideSecret)}
            className="absolute z-10 pl-4 border-l-2 top-7 right-4 border-slate-300"
          >
            {hideSecret ? hideIcon : showIcon}
          </TouchableOpacity>
        )}
      </View>

      {errorText && (
        <Text className="text-right text-purple-600">{errorText.toString()}</Text>
      )}
    </>
  );
}
