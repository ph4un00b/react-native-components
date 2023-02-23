import { View } from "react-native";

type IconProps = { size: number; children: React.ReactNode; bgColor: string };
export function AppIcon({ children, bgColor, size }: IconProps) {
  return (
    <View
      className={`${bgColor} flex items-center justify-center shadow-sm`}
      style={{ width: size, height: size, borderRadius: size * 0.5 }}
    >
      {children}
    </View>
  );
}
