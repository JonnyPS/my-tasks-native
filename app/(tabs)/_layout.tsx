import { Stack } from "expo-router";
// export default function Layout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ title: "Not Started" }} />
//       <Stack.Screen name="inProgress" options={{ title: "In Progress" }} />
//       <Stack.Screen name="completed" options={{ title: "Completed" }} />
//     </Stack>
//   );
// }

import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Octicons from "@expo/vector-icons/Octicons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Not Started",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "file-tray-stacked" : "file-tray-stacked-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="inProgress"
        options={{
          title: "In Progress",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused
                  ? "arrow-forward-circle"
                  : "arrow-forward-circle-outline"
              }
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="completed"
        options={{
          title: "Completed",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused
                  ? "checkmark-done-circle"
                  : "checkmark-done-circle-outline"
              }
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
