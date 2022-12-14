import { Alert, Button, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AppInput } from "../../shared/components/AppInput";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  const [extraStyles, setExtraStyles] = useState("bg-sky-500");
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: !true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            leftIcon={<AntDesign name="cloudupload" size={44} color="white" />}
            label={"email address"}
            name={"email"}
            type={"text"}
          >
            <TextInput
              className={
                extraStyles +
                " w-full h-16 text-xl p-4 pl-[90px] pr-16 my-1 mb-2 border-2 rounded-lg border-slate-200"
              }
              placeholder="Email"
              onFocus={() => {
                setExtraStyles("bg-rose-200 text-black");
              }}
              onBlur={() => {
                setExtraStyles("bg-sky-500 text-slate-100");
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
            />
          </AppInput>
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 16,
          required: !true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            leftIcon={
              <MaterialCommunityIcons
                name="lock-open"
                size={44}
                color="white"
              />
            }
            rightIcon={<AntDesign name="cloudupload" size={44} color="white" />}
            label={"password"}
            name={"password"}
            type={"secret"}
          >
            <TextInput
              className={
                extraStyles +
                " w-full h-16 text-xl p-4 pl-[90px] pr-16 my-1 mb-2 border-2 rounded-lg border-slate-200"
              }
              placeholder="* * * * * *"
              onFocus={() => {
                setExtraStyles("bg-rose-200 text-black");
              }}
              onBlur={() => {
                setExtraStyles("bg-sky-500 text-slate-100");
                onBlur();
              }}
              onChangeText={onChange}
              value={value}
            />
          </AppInput>
        )}
        name="password"
      />

      <Controller
        control={control}
        rules={{
          maxLength: 16,
          required: !true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppInput
            leftIcon={
              <MaterialCommunityIcons
                name="lock-open"
                size={44}
                color="white"
              />
            }
            showIcon={
              <MaterialCommunityIcons name="eye" size={44} color="white" />
            }
            hideIcon={
              <MaterialCommunityIcons name="eye-off" size={44} color="white" />
            }
            label={"password"}
            name={"password"}
            type={"secret"}
          >
            <TextInput
              className={
                extraStyles +
                " w-full h-16 text-xl p-4 pl-[90px] pr-16 my-1 mb-2 border-2 rounded-lg border-slate-200"
              }
              placeholder="* * * * * *"
              onFocus={() => {
                setExtraStyles("bg-rose-200 text-black");
              }}
              onBlur={() => {
                setExtraStyles("bg-sky-500 text-slate-100");
                onBlur();
              }}
              onChangeText={onChange}
              secureTextEntry={true}
              value={value}
            />
          </AppInput>
        )}
        name="password"
      />

      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
