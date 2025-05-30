import { Stack } from "expo-router";
import { ImageProvider } from '/Users/jameer/Documents/Coding/COSI-153/Orion/context/imageContext.js';


export default function RootLayout() {
  return (
    <ImageProvider>
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name = "About" options = {{ headerShown: false}} />
          <Stack.Screen name="preview" options={{ headerShown: false }} />
         <Stack.Screen name="photoview" options={{ headerShown: false }} />


      </Stack>
    </ImageProvider>
  );
}
