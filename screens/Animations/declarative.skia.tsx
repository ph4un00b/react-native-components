import { Canvas, Circle, Group, SkiaView } from "@shopify/react-native-skia";
import { View } from "react-native";

export function SkiaCanvas() {
	const size = 256;
	const r = size * 0.33;
	return (
		<View
			style={{
				// width: width - 24,
				flexGrow: 1,
				backgroundColor: "#ffffff",
				borderRadius: 10,
				overflow: "hidden",
				elevation: 1,
			}}
		>
			<SkiaView style={{ zIndex: 10 }} />
			<Canvas style={{ flex: 1 }}>
				<Group blendMode="multiply">
					<Circle cx={r} cy={r} r={r} color="cyan" />
					<Circle cx={size - r} cy={r} r={r} color="magenta" />
					<Circle cx={size / 2} cy={size - r} r={r} color="yellow" />
				</Group>
			</Canvas>
		</View>
	);
}
