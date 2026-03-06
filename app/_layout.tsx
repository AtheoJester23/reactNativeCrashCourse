import { Stack } from "expo-router";
import { Provider } from "react-redux";
import "../global.css";
import { store } from "./state/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="details"
          options={{
            title: "Details",
            presentation: "formSheet",
            headerShown: false,
            sheetGrabberVisible: true,
            sheetAllowedDetents: [0.3, 0.5, 0.7],
          }}
        />
      </Stack>
    </Provider>
  );
}
