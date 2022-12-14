import { Alert, Button, Text, TextInput, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { AppInput } from "../../shared/components/AppInput";
import {
  AntDesign as AIcon,
  MaterialCommunityIcons as MIcon,
} from "@expo/vector-icons";

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

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: !true,
        }}
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
          />
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
            leftIcon={<MIcon name="lock-open" size={44} color="white" />}
            rightIcon={<AIcon name="cloudupload" size={44} color="white" />}
            label={"password"}
            name={"password"}
            type={"secret"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={"passsswword"}
          />
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
          />
        )}
        name="password"
      />

      {errors.password && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
