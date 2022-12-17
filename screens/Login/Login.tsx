import { Button, ScrollView, Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AppInput } from "../../shared/components/AppInput";
import {
  /** @see https://icons.expo.fyi/ */
  AntDesign as AIcon,
  MaterialCommunityIcons as MIcon,
} from "@expo/vector-icons";
import { SubmitButton } from "../../shared/components/Button.submit";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { color } from "react-native-tailwindcss";

const Form = z.object({
  email: z.string().max(256).min(4).email(),
  password: z.string().max(256).min(8),
});

const Item: any = Picker.Item;
export function LoginPage() {
  const [selectedLanguage, setSelectedLanguage] = useState();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Form),
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <ScrollView className="flex flex-1 px-4">
      {/** @see https://github.com/react-native-picker/picker */}
      {/* <Picker className="shadow-sm w-full h-16 text-xl pl-[90px] pr-16 my-1 mb-2 border-2 rounded-lg" */}
      <View className="py-2">
        <Text className="pl-1.5 pb-3 capitalize block text-sm font-medium text-slate-200">
          picker
        </Text>
        <Picker
          accessibilityLabel="Basic Picker Accessibility Label"
          style={{
            borderColor: color.orange200,
            backgroundColor: color.gray700,
            borderRadius: 8,
            borderWidth: 2,
            fontSize: 20,
            height: 64,
          }}
          dropdownIconColor={color.gray200}
          dropdownIconRippleColor="purple"
          mode="dialog"
          prompt="Pick one, just one"
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
        >
          <Item label="red" color="red" style={{ color: "red" }} value="red" />
          <Item
            label="Sin"
            value="key0"
            enabled={false}
            style={{ backgroundColor: color.gray600, color: color.gray200 }}
          />
          <Item
            label="Cos"
            value="key1"
            color={color.gray200}
            style={{ backgroundColor: color.gray600, fontSize: 20 }}
          />
          <Item
            label="Tan"
            value="key2"
            style={{
              backgroundColor: color.gray600,
              fontFamily: "serif",
              color: color.gray200,
            }}
          />
        </Picker>
      </View>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            leftIcon={<AIcon name="cloudupload" size={44} color="white" />}
            label={"email address"}
            name={"email"}
            type={"email"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={"email"}
            error={errors.email}
            errorText={errors.email?.message?.toString()}
          />
        )}
        name="email"
      />

      {/* {errors.email && <Text className="text-rose-700">This is required.</Text>} */}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            leftIcon={<MIcon name="lock-open" size={44} color="white" />}
            showIcon={<MIcon name="eye" size={44} color="white" />}
            hideIcon={<MIcon name="eye-off" size={44} color="white" />}
            label={"password"}
            name={"password"}
            type={"secret"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={"passssword"}
            error={errors.password}
            errorText={errors.password?.message?.toString()}
          />
        )}
        name="password"
      />

      {/* {errors.password && <Text className="text-rose-500">Required</Text>} */}
      {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      <SubmitButton onPress={handleSubmit(onSubmit)}>Submit!</SubmitButton>
    </ScrollView>
  );
}
