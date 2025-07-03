import { useImages } from "@/context/imageContext";
import { GoogleGenAI } from "@google/genai";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PhotoView() {
  const router = useRouter();
  const { uri } = useLocalSearchParams();
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const { removeImage } = useImages();

  // instantiate your Gemini client
  const ai = new GoogleGenAI({ apiKey: "INSERT_API_KEY_HERE" });

  useEffect(() => {
    if (!uri) return;

    const runAnalysis = async () => {
      setLoading(true);
      try {
        const base64Image = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const contents = [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          {
            text: 'Is there a book in this image? If a book is found please give the title and author. Otherwise say "Book not found." Titles may also be found in yidish If that is the case please translate into english. If there is a date that can be found include that too.',
          },
        ];

        // generateContent returns the response directly
        const aiResponse = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents,
        });

        // call .text() on the returned response
        const txt = await aiResponse.text;
        setAnalysis(txt);
      } catch (e) {
        console.error(e);
        setError("Failed to analyze image.");
      } finally {
        setLoading(false);
      }
    };

    runAnalysis();
  }, [uri]);

  const handleDelete = () => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          removeImage(uri);
          router.back(); // or router.replace('/index')
        },
      },
    ]);
  };

  if (!uri) return <Text>No image found</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
      {loading && <ActivityIndicator size="large" color="#fff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      {analysis && (
        <View>
          <View style={styles.analysisBox}>
            <Text style={styles.analysisText}>{analysis}</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Add a comment about this photo"
            placeholderTextColor="#888"
            value={comment}
            onChangeText={setComment}
            multiline
          />
          {comment ? (
            <Text style={{ color: "#aaa", marginTop: 8 }}>
              Your comment: {comment}
            </Text>
          ) : null}
          <Button
            title="Delete this Photo"
            onPress={handleDelete}
            color="#ff4444"
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    padding: 12,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
    marginBottom: 16,
  },
  analysisBox: {
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  analysisText: {
    color: "#fff",
    fontSize: 16,
  },
  error: {
    color: "red",
    marginTop: 12,
  },
  input: {
    backgroundColor: "#1a1a1a",
    color: "#fff",
    borderRadius: 8,
    padding: 10,
    marginTop: 16,
    fontSize: 16,
    minHeight: 60,
  },
});
