import { Button, Text, View } from "react-native";
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

const Form = z.object({
  email: z.string().max(256).min(4).email(),
  password: z.string().max(256).min(8),
});

export function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Form),
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <View className="px-4">
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
    </View>
  );
}
